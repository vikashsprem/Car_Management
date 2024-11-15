const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const productSchema = new mongoose.Schema({
    images: [String],
    title: String,
    description: String,
    tags: [String]
})

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)

module.exports = {
    User,
    Product
}