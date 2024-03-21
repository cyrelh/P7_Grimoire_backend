// on importe app.js crée par express via méthode require
const express = require('express');
//Nous enregistrons les routes dans notre routeur
const router = express.Router();
// On importe la logique métier de userController
const userCtrl = require('../controllers/userController');


router.post('/signup', userCtrl.signup);

module.exports = router;
