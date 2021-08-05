const express = require("express");
const appointmentsController = require('../controllers/appointments-controller');
const router = express.Router();


router.get('/:aid', appointmentsController.getAppointmentsById);


router.get('/users/:uid', appointmentsController.getAppointmentsByUserId);


module.exports = router;
