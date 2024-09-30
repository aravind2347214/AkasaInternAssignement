const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'Item'
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Processing', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    trackingId: {
        type: String,
        unique: true,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
