const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phoneType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  creator: {
      type: String,
      required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;