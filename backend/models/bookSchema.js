const mongoose = require('mongoose');

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
// La méthode Schéma de Mongoose permet de créer un schéma de données pour la base de données MongoDB
//La méthode model transforme ce modèle en modèle utilisable
//on exporte ce schéma en tant que modèle Mongoose appelé bookSchema 