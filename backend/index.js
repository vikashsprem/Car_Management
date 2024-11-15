const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { userRouter } = require('./routers/user')
const { productRouter } = require('./routers/product')
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'https://car-management-flame.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/products', productRouter)

app.get('/', (req, res) => {
    res.send("Okay")
})

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to the database")
    } catch (error) {
        console.error("Error connecting to the database", error)
    }
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}

main();