const mongoose = require("mongoose")
const User = require("../model/User"); 
const Item = require("../model/Item");
const Order = require("../model/Order")

exports.getUserById = async(req,res)=>{
    try {
        const userId = req.params.userId;
        // console.log(userId);
        
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).json({ error: "Invalid userId format" });
        }
    
        const user = await User.findById(userId).populate({
            path: 'orderHistory',
            populate: {
                path: 'items',
                model: 'Item'
            }
        })
        .populate('cart');
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

exports.addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Check if userId and itemId are valid ObjectIds
        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ error: "Invalid userId or itemId format" });
        }

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the item by itemId
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Push the item to the user's cart (no existence check)
        user.cart.push(itemId);

        // Save the updated user document
        await user.save();

        // Send success response with updated cart
        res.status(200).json({ message: "Item added to cart successfully", addSuccess: true, cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        console.log("aksdjvnskjd",res.body)

        // Validate the IDs
        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(itemId)) {
            return res.status(400).json({ error: "Invalid userId or itemId format" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" ,removeSuccess:false});
        }

        // Find the index of the first occurrence of the item
        const itemIndex = user.cart.findIndex(cartItem => cartItem.toString() === itemId);

        // If the item exists, remove it
        if (itemIndex !== -1) {
            user.cart.splice(itemIndex, 1); // Remove only the first occurrence
            await user.save();
            return res.status(200).json({ message: "Item removed from cart successfully", cart: user.cart ,removeSuccess:true});
        } else {
            return res.status(404).json({ error: "Item not found in cart",removeSuccess:false });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" ,removeSuccess:false});
    }
};
