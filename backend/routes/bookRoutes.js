// on importe app.js crée par express via méthode require
const express = require('express'); 
const auth = require('../middleware/auth');


//Nous enregistrons les routes dans notre routeur
const router = express.Router();


module.exports = router;
