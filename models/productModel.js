
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
    productId: String,
    descrpition: String,
    image: String,
    pricing: String,
    shippingCost: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;