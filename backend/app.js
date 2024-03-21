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

// Anti-CORS errors
// Middleware pour gérer les CORS (Cross-Origin Resource Sharing) --> système de sécurité qui empêche requêtes malveillantes d'accéder à des ressources sensibles
//Pour cela, nous devons ajouter des headers sur objet res réponse (méthode setHeader) à notre objet  response  qu’on renvoie au navigateur 
// pour lui dire TOUT VA BIEN : vous pouvez utiliser cette API
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
	//TOUT CA VA PERMETTRE à l’app d’accéder sans problèmes à l’API
    // Ne pas oublier next pour passer l’éxécution au middleware d’après
	next();
});

app.use('/api/books', bookRoutes); // dorénavant tout ce qui passe par api/books ça passera par bookRouter dans le rép routes
app.use('/api/auth', userRoutes); // dorénavant tout ce qui passe par api/auth ça passera par userRoutes dans le rép routes

// On indique à Express de gérer la ressource images de manière statique via express.static,puis on combine ce chemin via
//  __dirname(var -g de node représentant le chemin absolu du répertoire script) dès qu'elle recevra une requête vers la route images
app.use('/images', express.static(path.join(__dirname, 'images')));


// On va exporter cette application Express pour qu'on puisse y accéder depuis les autres fichiers de notre projet et notamment notre serveur node
module.exports = app;