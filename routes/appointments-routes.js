const express = require("express");
const appointmentsController = require('../controllers/appointments-controller');
const router = express.Router();
const { check } = require('express-validator');

router.get('/:aid', appointmentsController.getAppointmentsById);


router.get('/users/:uid', appointmentsController.getAppointmentsByUserId);

router.post(
    '/', 
    [
        check('name').not().isEmpty(),
        check('price').not().isEmpty(),
        check('description').isLength({min: 5}),
        check('phoneType').not().isEmpty(),
        check('date').not().isEmpty()
    ], 
    appointmentsController.createAppointment
);

router.patch('/:aid', appointmentsController.updateAppointment);

router.delete('/:aid', appointmentsController.deleteAppointment);


module.exports = router;
