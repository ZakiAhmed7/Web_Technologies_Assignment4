const express = require('express');
const router = express.Router();
const commentModel = require('../models/commentModel');
// const Comment = require('../models/commentModel');

// API to get all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await commentModel.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});
 

// API to add a comment
router.post('/comments', async (req, res) => {
    const {commentId, productName, userName, purchaseHistory, shippingAddress } = req.body;
    try {
        const comment = new Comment({commentId, productName, userName, purchaseHistory, shippingAddress});
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({error: 'Invaild Error'});
    }
});


//API to update a comment
router.put('/comments/:id', async (req, res) =>  {
    const getcommentId = req.params.id;
    const {commentId, productName, userName, purchaseHistory, shippingAddress } = req.body;
    try {
        const updateCommment = await Comment.findByIdAndUpdate(getcommentId, {commentId, productName, userName, purchaseHistory, shippingAddress }, {new : true});

        if(!updateCommment) {
            return res.status(404).json({error : 'Comment not found'});
        }
        res.json(updateCommment);
    } catch (error) {
        res.status(400).json({ error : 'Invaild data or error updating comment'});
    }
});

//API to Delete a comment
router.delete('/comment/:id', async (req, res) => {
    const getcommentID = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(getcommentID);
        if(!deletedComment) {
            return res.status(404).json( { error: 'Comment not found'});
        }
        res.json({message: 'Comment deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = router;
