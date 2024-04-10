require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// deceleare the connections here 
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');
const cartRouter = require('./routes/cart');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const app = express();
mongoose.connect('mongodb+srv://syedzakiahmed711:zakiMongoDB123@sza.ds76fcs.mongodb.net/?retryWrites=true&w=majority&appName=SZA')
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch( (err) => {
            console.log("Error: ", err);
        });

app.listen(3000, () => console.log('Server Started'));

app.get('/', (req, res) => {
    res.send("Hello world");
});


// Initialize the route to use
app.use(bodyParser.json());
app.use(userRouter);
app.use(commentRouter);
app.use(cartRouter);
app.use(productRouter);
app.use(orderRouter);




// const db = mongoose.connection

// app.get('/collections', async (req, res) => {
//     try {
//         const collections = await mongoose.connection.db.listCollections().toArray();
//         const collectionNames = collections.map(collection => collection.name);
//         res.json(collectionNames);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

app.use(express.json());