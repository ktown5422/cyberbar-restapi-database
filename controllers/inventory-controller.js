const HttpError = require("../Models/http-error");
const User = require("../Models/User");
const Inventory = require("../Models/Inventory");
const mongoose = require("mongoose");



const getInventoryItems = async (req, res, next) => {
    const userId = req.params.uid;

    let inventory;
    try{
        inventory =  await Inventory.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Fetching inventory items failed, try again later', 500);
        return next(error);
    }

    if (!inventory || inventory.length === 0) {
        return next(
            new HttpError('Could not find inventory items for the provided user id')
        );
     }
    
    res.json({ inventory: inventory.map(inventory => inventory.toObject({ getters: true })) });
};






const createInventoryItem = async (req, res, next) => {

    const { imageUrl, phoneType, price, quantity, creator } = req.body;

    const createdInventoryItem = new Inventory({
        imageUrl,
        phoneType,
        price,
        quantity,
        creator
    });

    let users;

    try {
        users = await User.findById(creator)
    } catch (err) {
        const error = new HttpError('Creating Inventory Item failed, please try again', 500);
        return next(error);
    }

    if (!users) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }


    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdInventoryItem.save({ session: sess });
        users.inventory.push(createdInventoryItem);
        await users.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
            'Creating Inventory Item failed, please try again',
            500
        );
        return next(error);
    }

    res.status(201).json({ inventory: createdInventoryItem });
};


exports.createInventoryItem = createInventoryItem;
exports.getInventoryItems = getInventoryItems;