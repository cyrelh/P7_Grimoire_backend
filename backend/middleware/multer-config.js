// On importe multer
const multer = require('multer');

// On associe les types MIME de certains formats d'image avec leurs extensions de fichier correspondantes
//Cela sera utilisé pour générer le nom de fichier correct lors du téléchargement d'une image.
const MIME_TYPES = { // les 4 différents MIME_TYPES qu'on peut avoir venant depuis  lefrontend
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
};

// on crée un objet de configuration de stockage avec multer
// méthode diskStorage() pour spécifier le chemin et le nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({ 
    //l'objet de config qu'on passe à disktorage a besoin de 2 éléments
	destination: (req, file, callback) => { //cela va expliquer à multer dans quel dossier enregistrer les fichiers
		callback(null, 'images'); // 1er arg null pour dire qu'il n'y a pas eu d'erreurs et en passant le nom du dossier (crée dans l'arbo) en 2e arg
	},
	// 2e élément "filname" : cela va expliquer à multer quel nom de fichier lors du téléchargement
	filename: (req, file, callback) => {
		// on va génrer le nouveau nom du fichier en remplaçant les espaces par des underscores dans le nom d'origine
		const name = file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, ""); // méthode split atour des espace créant un tableau ave cles différents mots du nom de fichier
        // et en appelant .join en rejoignant ce tableau en un seul string avec des _ à la place des espaces
		
        const extension = MIME_TYPES[file.mimetype]; // On crée l'extension du fichier qui sera l'élément de notre dictionnaire qui est le MIME_TYPES du fichier envoyé par le frontend
		callback(null, name + '_' + Date.now() + '.' + extension); // null pour dire pas d'erreur, name qu'on a crée au-dessus 
        // ajout d'un time stamp pour le rendre le + unique possible Date.now() Et ajout d'un . ET l'extension du fichier
        // on a donc générer un nom de fichier suffisamment uniuqe pour notre utilisation

	}
});

// On exporte la configuration multer avec le stockage configuré
module.exports = multer({ storage: storage }).single('image'); // méthode single pour dire que c'est un fichier unique et de type images seulement (et pas un groupe de fichiers)
