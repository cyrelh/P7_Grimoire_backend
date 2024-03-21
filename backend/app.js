// Importe Express avec commande require pour importer express
const express = require('express');

// Crée une application express app avec la méthode express
const app = express();


// Middleware pour traiter les données JSON dans les requêtes
app.use(express.json());

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




// On va exporter cette application Express pour qu'on puisse y accéder depuis les autres fichiers de notre projet et notamment notre serveur node
module.exports = app;