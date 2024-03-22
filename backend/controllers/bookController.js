const Book = require('../models/bookSchema');
const fs = require('fs');
const sharp = require('sharp');

// Création d'un nouveau livre, le format sera différent car un fichier a été transmis
exports.createBook = (req, res, next) => {
	//1- On va parser l’objet requête car objet envoyé dans la req va nous être envoyé sous forme JSON mais en string avec la fonction JSON.parse()
	const bookObject = JSON.parse(req.body.book);
	// On va supprimer dans cet objet 2 champs --> '_id' et '_userId' de l'objet book
	delete bookObject._id; // car l'id de l'obj va etre générer auto par notre db
	delete bookObject._userId; // c'est la personne qui a crée l'obj car PAS DE CONFIANCE DANS LE CLIENT donc A SUPPRIMER
    // Donc on va utiliser le _userId qui vient du token d'authentification --> EMPECHE QQUN malveillant de faire une req avec son propre token d'auth
    // mais en nous envoyant le token id de qqun d'autre cer qui pourrait nous faire croire c'est cette autre personne qui a crée l'obj
	
    
    // On donne un nom de fichier pour l'img redimensionnée avec l'extension '.webp'
	const resizedFileName = `resized-${req.file.filename.replace(/\.[^.]+$/,'')}.webp`;
	// On crée le chemin d'accès pour l'img redimensionnée dans le dossier 'images'
	const resizedImagePath = `./images/${resizedFileName}`;
	// on utilise le package Sharp pour redimensionner l'img
	sharp(req.file.path)
		.resize(206, 260) // on redimensionne l'img à une largeur de 206 pixels et une hauteur de 260 pixels
		.toFormat('webp', { quality: 80 }) // on convertit l'img en format WebP
		.toFile(resizedImagePath, (err, info) => {// on gère les erreurs lors du redimensionnement et de la conversion
			if (err) {
				return res.status(401).json({ error: err.message });
			}
			// On supprime le fichier original après redimensionnement 
            //grâce à méthode unlink() du package fs qui permet de supprimer un fichier du système de fichiers
			fs.unlink(req.file.path, (unlinkErr) => {
				if (unlinkErr) { // on gère les erreurs lors de la suppression du fichier original
					console.error(
						'Erreur lors de la suppression du fichier original:',
						unlinkErr);
				}
				//2- On crée un objet Book avec l'URL de l'image redimensionnée
				const book = new Book({
					...bookObject, // avec ce qui a été passé en 1- moins les _userId et _id

					userId: req.auth.userId, // les userId On les extrait de l'obj req grâce à notre middleware
                    // et on va générer l'URL de l'img MAIS mais multer ne ns passe que le nom du fichier
                    // Donc on fait appel à des propriétés de l'obj req (le protocol, le nom d'hote / images là où les stocke et nom de fichier redim )
					imageUrl: `${req.protocol}://${req.get('host')}/images/${resizedFileName}`});

				// On enregistre ce fichier book dans la base de données avec méthode save()
				book.save()
					.then(() => {
						res.status(201).json({ message: 'Livre enregistré !' });
					})
					.catch((error) => {
						res.status(404).json({ error: "Erreur lors de l'enregistrement !" });
					});// si erreur 404, c'est lié au fait que la req vers notre répertoire images n'est pas gérée
                    // car c'est notre serveur qui gère absoluement toutes les req
                    // donc il nous faut ajouter un route pour géréer ça dans app.js 
                    //app.use('/images', express.static(path.join(__dirname, 'images')));
			});
		});
};