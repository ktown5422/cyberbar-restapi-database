const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    required: true,
  },
  appointments: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Appointment',
  }],
  inventory: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Inventory',
  }],
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

module.exports = User;
