const bookSchema = require('../models/bookSchema');

// Création ou ajout d'un nouveau livre
exports.createBook = (req, res, next) => {
	//1- On extrait champ  book de la req reçu en string pour convertir JSON en objet
	const bookObject = JSON.parse(req.body.book);
	// On va supprimer dans cet objet 2 champs --> '_id' et '_userId' de l'objet book
	delete bookObject._id; // car l'id de l'obj va etre générer auto par notre db
	delete bookObject._userId; // c'est la personne qui a crée l'obj car PAS DE CONFIANCE DANS LE CLIENT donc A SUPPRIMER
    // Donc on va utiliser le _userId qui vient du token d'authentification --> EMPECHE QQUN malveillant de faire une req avec son propre token d'auth
    // mais en nous envoyant le token id de qqun d'autre cer qui pourrait nous faire croire c'est cette autre personne qui a crée l'obj
	
    
	//2- On crée nouvelle instance du modèle booskSchema -combine les propriétés de bookObject avec l'ID de l'utilisateur et l'URL de l'image
	const book = new bookSchema ({
	...bookObject, // avec ce qui a été passé en 1- moins les _userId et _id
	userId: req.auth.userId, // les userId On les extrait de l'obj req grâce à notre middleware
    // et on va générer l'URL de l'img MAIS mais multer ne ns passe que le nom du fichier
    // Donc on fait appel à des propriétés de l'obj req (le protocol, le nom d'hote / images là où les stocke et nom de fichier redim )
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,    });

    book.save() // On enregistre ce fichier book dans la base de données avec méthode save()

    .then(() => {
        res.status(201).json({ message: 'Livre enregistré !' });
    })
    .catch((error) => {
        res.status(400).json({ error: "Erreur lors de l'enregistrement !" });
    });
};// si erreur 404, c'est lié au fait que la req vers notre répertoire images n'est pas gérée
// car c'est notre serveur qui gère absoluement toutes les req
// donc il nous faut ajouter un route pour géréer ça dans app.js 
//app.use('/images', express.static(path.join(__dirname, 'images')));


// Récupère un livre en fonction de l'ID fourni dans la requête
exports.getOneBook = (req, res, next) => {
	// Recherche le livre dans la base de données avec l'identifiant fourni dans la requête
	bookSchema.findOne({ _id: req.params.id })
		.then((book) => res.status(200).json(book)) // Renvoie le livre trouvé avec un statut 200 (OK)
		.catch((error) => res.status(400).json({ error })); // Gère les erreurs liées à la recherche du livre dans la base de données
};

// Récupère tous les livres de la base de données
exports.getAllBooks = (req, res, next) => {
	// Utilise la méthode find() de Mongoose pour récupérer tous les livres
	bookSchema.find()
		.then((books) => res.status(200).json(books)) // Envoie la liste des livres avec un statut 200 (OK)
		.catch((error) => res.status(400).json({ error })); // Gère les erreurs liées à la récupération des livres depuis la base de données
};