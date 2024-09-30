const User = require("../model/User");
const mongoose = require("mongoose")
const Item = require("../model/Item")
const Order = require("../model/Order")

exports.checkout = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const user = await User.findById(userId).populate('cart');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        let total = 0;
        const orderItems = [];
        const stockUpdates = [];

        for (const item of user.cart) {
            if (item.stock < 1) {
                return res.status(400).json({ error: `Insufficient stock for item: ${item.name}` });
            }
            total += item.price;
            // Push the ObjectId of the item directly, not an object
            orderItems.push(item._id);
            stockUpdates.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $inc: { stock: -1 } }
                }
            });
        }
        

        const trackingId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        total = total.toFixed(2)
        const newOrder = new Order({
            user: userId,
            items: orderItems, // Now this will be an array of ObjectIds
            total,
            trackingId
        });

        await newOrder.save();
        await Item.bulkWrite(stockUpdates);

        user.orderHistory.push(newOrder._id);
        user.cart = [];
        await user.save();

        res.status(200).json({
            message: "Checkout successful",
            orderId: newOrder._id,
            trackingId: trackingId,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({ error: "Invalid orderId format" });
        }

        const order = await Order.findById(orderId).populate('user').populate('items.item');
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};