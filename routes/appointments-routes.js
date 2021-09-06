const express = require("express");
const appointmentsController = require('../controllers/appointments-controller');
const router = express.Router();
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');





router.use(checkAuth);

router.get('/:aid', appointmentsController.getAppointmentsById);


router.get('/users/:uid', appointmentsController.getAppointmentsByUserId);

router.post('/', appointmentsController.createAppointment);

router.patch('/:aid', appointmentsController.updateAppointmentById);

router.delete('/:aid', appointmentsController.deleteAppointment);


module.exports = router;
