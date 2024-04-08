// On utilise dotenv pour masquer dans des variables d'environnement les infos sensibles !
require('dotenv').config();

// Importation Express avec commande require
const express = require('express');

//Importation le module mongoose
const mongoose = require('mongoose');

const DATABASE_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DATABASE_DOMAIN}`;


// On crée une application express app avec la méthode express
const app = express();

// On importe la route vers la collection bookRoutes
const bookRoutes = require('./routes/bookRoutes');
// On importe la route vers la collection userRoutes
const userRoutes = require('./routes/userRoutes');

const path= require('path');

async function connect(){ // promesses donc fonction connect() asynchrone
    try {
        await mongoose.connect(DATABASE_URI);
        console.log("Vous êtes connecté à MongoDB !");
      } catch (e) {
        console.error(e);
      }
}
connect(); // on appelle notre fonciton connect

// capable de traiter les doonénes body en JSON dans les requêtes
app.use(express.json());

// Middleware pour gérer les CORS --> système de sécurité qui empêche requêtes malveillantes d'accéder à des ressources sensibles
// solutions --> ajout des headers sur objet réponse (méthode setHeader)
// TOUT CA VA PERMETTRE à l’app d’accéder sans problèmes à l’API

app.use((req, res, next) => {
	// On dit que l'Origin qui a le droit d'accéder à notre API c'est tout le monde d'où '*'
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Autorise certains en-têtes mentionnés aux requêtes envoyées vers notre API
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	// On autorise certains types de méthodes (verbes HTTP) 
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
    // Ne pas oublier next pour passer l’éxécution au middleware d’après
	next();
});

app.use('/api/books', bookRoutes); // dorénavant tout ce qui passe par api/books ça passera par bookRouter dans le rép routes
app.use('/api/auth', userRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));
// on rajoute une route pour images
// on utilise middleware static fourni par Express
// on récup le répertoire dans lequel s'exécute notre serveur 
// on y concaténe le répertoire 'images' pour obtenir le chemin complet


// On exporte cette app Express pour qu'on puisse y accéder depuis les autres fichiers de notre projet et surtout notre serveur node
module.exports = app;