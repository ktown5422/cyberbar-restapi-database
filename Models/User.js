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
  // creator: [{
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: 'Appointment',
  // }],
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

module.exports = User;
