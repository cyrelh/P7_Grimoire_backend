const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// On crée un schéma de données qui contient les champs souhaités 
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true }, // indiquant leur type et leur caractère obligatoire 
	//ET ATTENTION unique:true --> impossible de s'inscrire plusieurs fois avec la meme email
	//sinon Pb peut arriver car plusieurs users pourraient utiliser le meme email sans protection 
	//pour les empecher plusieurs fois de s'enregistrer
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //NEPAS OUBLIER !!!package npm install mongoose-unique-validator cô plugin appliqué à notre userSchéma



module.exports = mongoose.model('userSchema', userSchema); 

// La méthode Schéma de Mongoose permet de créer un schéma de données pour la base de données MongoDB
//La méthode model transforme ce modèle en modèle utilisable
//on exporte ce schéma en tant que modèle Mongoose appelé userSchema 
