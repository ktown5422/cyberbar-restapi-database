const express = require("express");
const inventoryController = require('../controllers/inventory-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');





router.use(checkAuth);

router.post('/', inventoryController.createInventoryItem);

router.get('/users/:uid', inventoryController.getInventoryItems);

module.exports = router;
