const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/userModel');

// const User = mongoose.model('Users');


//Creating an endpoints

// 1. Getting all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});
// 2. Creating a user
router.post('/users', async (req, res) => {
    const {email, password, userName, purchaseHistory, shippingAddress} = req.body;
    const user = new User ( { email, password, userName, purchaseHistory, shippingAddress });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
// 3. updating a user
router.patch('/users/:id', async (req, res) => {
    const getUserId = req.params.id;
    const {email, password, userName, purchaseHistory, shippingAddress} = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(getUserId, {email, password, userName, purchaseHistory, shippingAddress});
        if(!updateUser) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json(updateUser);
    } catch (err) {
        res.status(404).json({error : err.message});
    }
});
// 4. deleting a user
router.delete('/users/:id', async (req, res) => {
    const getUserId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(getUserId);
        if(!deletedUser) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json({message: 'User Deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;