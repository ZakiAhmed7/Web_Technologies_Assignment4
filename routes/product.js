const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const Product = require('../models/productModel');

// API to get all products
router.get('/products', async (req, res) => {
    try {
        const product = await productModel.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});
 

// API to add a products
router.post('/products', async (req, res) => {
    const {  productId, description, image, pricing, shippingCost  } = req.body;
    try {
        const product = new Product({ productId, description, image, pricing, shippingCost });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({error: 'Invaild Error'});
    }
});


//API to update a product
router.put('/products/:id', async (req, res) =>  {
    const getProductId = req.params.id;
    const { productId, description, image, pricing, shippingCost } = req.body;
    try {
        const updateProduct = await Product.findByIdAndUpdate(getProductId, { productId, description, image, pricing, shippingCost }, {new : true});

        if(!updateProduct) {
            return res.status(404).json({error : 'Comment not found'});
        }
        res.json(updateProduct);
    } catch (error) {
        res.status(400).json({ error : 'Invaild data or error updating comment'});
    }
});

//API to Delete a product
router.delete('/products/:id', async (req, res) => {
    const getProductID = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(getProductID);
        if(!deletedProduct) {
            return res.status(404).json( { error: 'Comment not found'});
        }
        res.json({message: 'Comment deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
