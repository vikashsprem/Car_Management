const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { userRouter } = require('./routers/user')
const { productRouter } = require('./routers/product')
require('dotenv').config();

const app = express();

const allowedOrigins = [
    'https://car-management-flame.vercel.app', // Production frontend
    'http://localhost:5473', // Development frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/products', productRouter)

app.get('/', (req, res) => {
    res.send("Okay")
})

async function main() {
    try {
        await mongoose.connect(process.env.VITE_MONGODB_URI)
        console.log("Connected to the database")
    } catch (error) {
        console.error("Error connecting to the database", error)
    }
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}

main();