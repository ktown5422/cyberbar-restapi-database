const express = require("express");
const appointmentsController = require('../controllers/appointments-controller');
const router = express.Router();
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload');



// router.use();

router.get('/:aid', appointmentsController.getAppointmentsById);


router.get('/users/:uid', appointmentsController.getAppointmentsByUserId);

router.post('/', fileUpload.single('imageUrl'), appointmentsController.createAppointment);

router.put('/:aid', appointmentsController.updateAppointment);

router.delete('/:aid', appointmentsController.deleteAppointment);


module.exports = router;
