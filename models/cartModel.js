const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({ 
    cartId: String,
    productName: String,
    quantity: String,
    user: String,
    totalCost: String
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;