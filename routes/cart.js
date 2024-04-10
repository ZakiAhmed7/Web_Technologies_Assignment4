const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel');

// API to get all carts
router.get('/carts', async (req, res) => {
    try {
        const cart = await cartModel.find();
        res.json(cart);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});
 

// API to add a cart
router.post('/carts', async (req, res) => {
    const { cartId, productName, quantity, user, totalCost } = req.body;
    try {
        const cart = new Cart({cartId, productName, quantity, user, totalCost});
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({error: 'Invaild Error'});
    }
});


//API to update a comment
router.put('/carts/:id', async (req, res) =>  {
    const getCartId = req.params.id;
    const {cartId, productName, quantity, user, totalCost } = req.body;
    try {
        const updateCart = await Cart.findByIdAndUpdate(getCartId, {cartId, productName, quantity, user, totalCost }, {new : true});

        if(!updateCart) {
            return res.status(404).json({error : 'Comment not found'});
        }
        res.json(updateCart);
    } catch (error) {
        res.status(400).json({ error : 'Invaild data or error updating comment'});
    }
});

//API to Delete a comment
router.delete('/carts/:id', async (req, res) => {
    const getCartID = req.params.id;
    try {
        const deletedCart = await Comment.findByIdAndDelete(getCartID);
        if(!deletedCart) {
            return res.status(404).json( { error: 'Comment not found'});
        }
        res.json({message: 'Comment deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = router;
