const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
    orderId: String,
    orderName: String,
    orderItems : String,
    shippingCost: String,
    totalAmount: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;