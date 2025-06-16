var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const appController = require('../controller/app.controller');

router.get('/hello', appController.hello);
router.get('/products', appController.getProducts);
router.get('/products/:id', appController.getProductById);
router.post('/addProduct', upload.single('image'), appController.addProduct);
router.put('/update/:id', upload.single('image'), appController.updateProduct);
router.delete('/delete/:id', appController.deleteProduct);

module.exports = router;