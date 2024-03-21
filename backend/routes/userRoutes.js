// on importe app.js crée par express via méthode require afin de créer un routeur
const express = require('express');
//On crée un routeur avec la fonction Router d'Express
const router = express.Router();
// On importe la logique métier de userController pour associer nos différentes routes
const userCtrl = require('../controllers/userController');

// On va créer 2 routes POST car le frontend va aussi envoyer des infos (email + mdp)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//On va exporter ce routeur comme ça dans app.js on pourra l'importer
module.exports = router;
