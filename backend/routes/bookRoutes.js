// on importe app.js crée par express via méthode require
const express = require('express');

// On importe la logique métier de bookController
const bookCtrl = require('../controllers/bookController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const imgConversion = require('../middleware/sharp-config');

//Nous enregistrons les routes dans notre routeur
const router = express.Router();


router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, multer, imgConversion,  bookCtrl.createBook);
router.put('/:id', auth, multer, imgConversion, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.ratingBook);


module.exports = router;
