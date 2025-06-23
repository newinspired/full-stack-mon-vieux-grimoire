const express = require('express');
const router = express.Router();
//const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');


router.get('/', bookCtrl.getAllStuff);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.post('/', auth, bookCtrl.createBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router; 