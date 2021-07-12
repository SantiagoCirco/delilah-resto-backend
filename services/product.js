const Product = require('../models/product');

async function createNewProduct(req, res) {
    const { name, price, image } = req.body;
    if (name.length === 0 || image.length === 0 || !name || !image || !price) {
        res.status(400).json({ message: 'The request is invalid.' });
    }
    try {
        const newProduct = await Product.create({ name, price, image });
        if (!newProduct) return res.status(400).json({ message: 'Could not create a new product.' });
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findByPk(req.body.id);
        if (!product) res.status(404).json({ message: 'Product not found.' });

        const updatedProduct = await Product.update(
            {
                name: req.body.name ? req.body.name : product.name,
                price: req.body.price ? req.body.price : product.price,
                image: req.body.image ? req.body.pimage : product.image,
            },
            {
                where: { id: req.body.id }
            }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Some error has ocurred' });
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) res.status(404).json({ message: 'Product not found.' });
        const deletedProduct = await product.destroy();
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Some error has ocurred' });
    }
}
module.exports = { createNewProduct, updateProduct, deleteProduct};