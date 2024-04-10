const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ( {
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    purchaseHistory: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);