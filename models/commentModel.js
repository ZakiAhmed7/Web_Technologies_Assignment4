const mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema( {
    commentId : String,
    productName : String,
    userName : String,
    purchaseHistory : String,
    shippingAddress :String
});

const Comment = mongoose.model('CommentModel', commentSchema);

module.exports = Comment;