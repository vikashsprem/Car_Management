const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../db')
const { SECRET_KEY } = require('../config')

const userRouter = Router()

// Sign-in route
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email and password
        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(403).json({
                message: 'User not found'
            })
        }

        // Generate the token
        const token = jwt.sign({ user }, SECRET_KEY)

        res.status(200).json({
            message: 'User has been logged in successfully',
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
})

// Sign-up route
userRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email, password })
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        // Create the new user
        await User.create({ name, email, password })

        res.status(201).json({
            message: 'User has been created successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
})

module.exports = {
    userRouter: userRouter
};
