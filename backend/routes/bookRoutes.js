// on importe app.js crée par express via méthode require
const express = require('express'); 
const auth = require('../middleware/auth');
//Nous enregistrons les routes dans notre routeur
const router = express.Router();
// on importe les fonctions correctement
const multer = require('../middleware/multer-config');

// On importe la logique métier de bookController
const bookCtrl = require('../controllers/bookController');


router.post('/', auth, multer, bookCtrl.createBook);


module.exports = router;
