const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { validateAdminAuthorization } = require('../middlewares/user');
const { createNewProduct, updateProduct, deleteProduct } = require('../services/product');
// 
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    if (!products) res.status(404).json({ message: 'Products couldn\'t be found.' });
    res.status(200).json(products);
});

router.post('/', validateAdminAuthorization, createNewProduct);



router.put('/', validateAdminAuthorization, updateProduct);

router.delete('/:id', validateAdminAuthorization, deleteProduct);

module.exports = router;