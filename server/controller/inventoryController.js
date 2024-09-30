const mongoose = require('mongoose');
const Item = require("../model/Item");

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const { itemId } = req.params;

        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ error: "Invalid itemId format" });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!['Fruits', 'Vegetables', 'Non-Veg', 'Breads', 'Others'].includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        const items = await Item.find({ category });
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { name, category, description, price, stock, image } = req.body;

        if (!name || !category || !price || !stock) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newItem = new Item({
            name,
            category,
            description,
            price,
            stock,
            image
        });

        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// exports.addItems = async (req, res) => {
//     try {
//         const items = req.body.items;

//         if (!Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ error: "Input should be a non-empty array of items" });
//         }

//         const errors = [];
//         const savedItems = [];

//         for (const item of items) {
//             const { name, category, description, price, stock, image } = item;

//             // Validate required fields for each item
//             if (!name || !category || !price || !stock) {
//                 errors.push({ error: `Missing required fields for item: ${name || 'Unnamed item'}`, item });
//                 continue; // Skip saving this item
//             }

//             // Create new item object
//             const newItem = new Item({
//                 name,
//                 category,
//                 description,
//                 price,
//                 stock,
//                 image
//             });

//             // Save item to the database
//             try {
//                 await newItem.save();
//                 savedItems.push(newItem);
//             } catch (error) {
//                 errors.push({ error: `Failed to save item: ${name}`, item });
//             }
//         }

//         // Return success message and details of saved and failed items
//         if (savedItems.length > 0) {
//             return res.status(201).json({
//                 message: "Items processed successfully",
//                 savedItems,
//                 errors
//             });
//         } else {
//             return res.status(400).json({
//                 message: "No items were successfully saved",
//                 errors
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };