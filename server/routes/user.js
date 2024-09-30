const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

// USER ROUTES
userRouter.get('/user/:userId', userController.getUserById);
userRouter.post('/user/add-to-cart',userController.addToCart)
userRouter.put('/user/remove-from-cart',userController.removeFromCart)

module.exports = userRouter;
