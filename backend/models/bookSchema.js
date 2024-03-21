const mongoose = require('mongoose');//Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose

// On crée un schéma de données qui contient les champs souhaités 
const bookSchema = mongoose.Schema({
	userId: { type: String, required: true },
	title: { type: String, required: true },
	author: { type: String, required: true },
	imageUrl: { type: String, required: true },
	year: { type: Number, required: true },
	genre: { type: String, required: true },
	ratings: [
		{
			userId: { type: String},
			grade: { type: Number, required: true },
		},
	],
	averageRating: {
		type: Number,
	},
});

module.exports = mongoose.model('bookSchema', bookSchema);
//on exporte ce schéma en tant que modèle Mongoose appelé bookSchema 
//le rendant par là même disponible pour notre application Express

// La méthode Schéma de Mongoose permet de créer un schéma de données pour la base de données MongoDB
//La méthode model transforme ce modèle en modèle utilisable