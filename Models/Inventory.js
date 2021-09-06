const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    imageUrl: { 
        type: String, 
        required: true 
    },
    phoneType: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;