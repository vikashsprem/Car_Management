const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const { Product } = require('../db')

const productRouter = Router()

// Create Product
productRouter.post('/create', auth, async (req, res) => {
    try {
        const { images, title, description, tags } = req.body;

        // Create the product
        await Product.create({ images, title, description, tags })

        res.json({
            message: 'Product has been created successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error creating product',
            error: error.message
        })
    }
})

// Get all products
productRouter.get('/details', auth, async (req, res) => {

    try {
        const products = await Product.find();
        res.json({
            message: 'Success',
            products: products
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        })
    }
})

// Get product by ID
productRouter.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            message: 'Success',
            product: product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// Edit product by ID
productRouter.put('/edit/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { images, title, description, tags } = req.body;
    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Update the product
        const updateResult = await Product.updateOne(
            { _id: id },
            { images, title, description, tags }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({
                message: 'No changes made to the product'
            });
        }

        // Respond with success message
        res.json({
            message: 'Product updated successfully'
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
});

// Delete product by ID
productRouter.delete('/delete/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Proceed with deletion
        await Product.deleteOne({ _id: id });
        return res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Failed to delete product',
            error: error.message
        });
    }
});

module.exports = {
    productRouter: productRouter
};
