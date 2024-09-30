const express = require('express');
const inventoryRouter = express.Router();
const inventoryController = require('../controller/inventoryController');

// INVENTORY ROUTES
inventoryRouter.get('/items', inventoryController.getAllItems);
inventoryRouter.get("/items-by-id/:itemId",inventoryController.getItemById)
inventoryRouter.get('/items-by-category/:category', inventoryController.getItemsByCategory);
inventoryRouter.post('/items',inventoryController.addItem)
// inventoryRouter.post('/items',inventoryController.addItems)



module.exports = inventoryRouter;