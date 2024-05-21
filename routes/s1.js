var express = require('express');
var router = express.Router();

const appController = require('../app.controller');

router.get('/hello', appController.hello);
router.get('/products', appController.getProducts);
router.post('/addProduct', appController.addProduct);

module.exports = router;