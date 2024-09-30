const mongoose = require('mongoose');

// Define the Item schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fruits', 'Vegetables', 'Non-Veg', 'Breads','Others']
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String, // URL or path to the image
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
