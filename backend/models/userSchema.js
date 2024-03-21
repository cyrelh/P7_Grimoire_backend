const mongoose = require('mongoose'); //Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose
const uniqueValidator = require('mongoose-unique-validator');


// On crée un schéma de données qui contient les champs souhaités 
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true }, // indiquant leur type et leur caractère obligatoire ET unique --> impossible de s'inscrire plusieurs fois avec la meme email
	//Car unique: true sinon Pb peut arriver car plusieurs users pourraient utiliser le meme email sans protection pour les empecher plusieurs fois de s'enregistrer
	// mais ça suffit pas car peut avoir des erreurs illisibles de la part de mongoDB
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //donc on rajoute un package npm install mongoose-unique-validator cô plugin appliqué à notre userSchéma



module.exports = mongoose.model('userSchema', userSchema); //on exporte ce schéma en tant que modèle Mongoose appelé userSchema 
//le rendant par là même disponible pour notre application Express

// La méthode Schéma de Mongoose permet de créer un schéma de données pour la base de données MongoDB
//La méthode model transforme ce modèle en modèle utilisable

