const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  imageUrl: { 
    type: String, 
    required: true 
  },
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
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;