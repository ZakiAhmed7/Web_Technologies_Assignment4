const express = require('express');
const router = express.Router();
const orderModel = require('../models/orderModel');

// API to get all order
router.get('/orders', async (req, res) => {
    try {
        const order = await orderModel.find();
        res.json(order);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});
 

// API to add a order
router.post('/orders', async (req, res) => {
    const {orderId, orderName, orderItems, shippingAddress, totalAmount } = req.body;
    try {
        const order = new Order({ orderId, orderName, orderItems, shippingAddress, totalAmount});
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({error: 'Invaild Error'});
    }
});


//API to update a order
router.put('/orders/:id', async (req, res) =>  {
    const getOrderId = req.params.id;
    const { orderId, orderName, orderItems, shippingAddress, totalAmount } = req.body;
    try {
        const updateOrder = await Order.findByIdAndUpdate(getOrderId, { orderId, orderName, orderItems, shippingAddress, totalAmount }, {new : true});

        if(!updateOrder) {
            return res.status(404).json({error : 'Comment not found'});
        }
        res.json(updateOrder);
    } catch (error) {
        res.status(400).json({ error : 'Invaild data or error updating order'});
    }
});

//API to Delete a order
router.delete('/orders/:id', async (req, res) => {
    const getOrderID = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(getOrderID);
        if(!deletedOrder) {
            return res.status(404).json( { error: 'Comment not found'});
        }
        res.json({message: 'Order deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;
