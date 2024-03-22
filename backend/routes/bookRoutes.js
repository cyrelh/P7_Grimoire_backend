// on importe app.js crée par express via méthode require
const express = require('express'); 
//Nous enregistrons les routes dans notre routeur
const router = express.Router();
const auth = require('../middleware/auth');
// on importe les fonctions correctement
const multer = require('../middleware/multer-config');

// On importe la logique métier de bookController
const bookCtrl = require('../controllers/bookController');


router.post('/', auth, multer, bookCtrl.createBook);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook); //ajout de multer entre le middleware d’auth et le gestionnaire de notre route
router.delete('/:id', auth, bookCtrl.deleteBook);




module.exports = router;
