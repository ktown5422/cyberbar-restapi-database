const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    phoneScreenName: {
        type: String,
    }
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;