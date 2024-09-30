const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController');

// ORDER ROUTES
orderRouter.post('/order/checkout/:userId', orderController.checkout);
orderRouter.get("/order/:orderId",orderController.getOrderById)

module.exports = orderRouter;
