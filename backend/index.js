const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { userRouter } = require('./routers/user');
const { productRouter } = require('./routers/product');
require('dotenv').config();

const app = express();

// Apply CORS middleware
app.use(cors());

// JSON body parser
app.use(express.json());

// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productRouter);

// Test route
app.get('/', (req, res) => {
    res.send("Okay");
});

// Database connection and server start
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit the process if DB connection fails
    }
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

main();
