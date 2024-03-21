const mongoose = require('mongoose'); //Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose

// On crée un schéma de données qui contient les champs souhaités 
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true }, // indiquant leur type et leur caractère obligatoire
	password: { type: String, required: true },
});

module.exports = mongoose.model('userSchema', userSchema); //on exporte ce schéma en tant que modèle Mongoose appelé userSchema 
//le rendant par là même disponible pour notre application Express

// La méthode Schéma de Mongoose permet de créer un schéma de données pour la base de données MongoDB
//La méthode model transforme ce modèle en modèle utilisable

