// Importe Express avec commande require pour importer express
const express = require('express');

// Crée une application express avec la méthode express
const app = express();


// On va exporter cette application Express pour qu'on puisse y accéder depuis les autres fichiers de notre projet et notamment notre serveur node
module.exports = app;