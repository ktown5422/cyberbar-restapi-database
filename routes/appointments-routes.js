const express = require("express");
const router = express.Router();

const Appointment = require("../Models/Appointments");

const DUMMY_APPOINTMENT = [
    {
        id: 'a1',
        phone: 'iphone X',
        notes: 'cracked screen and battery replacement',
        creator: 'u1',
    }
];



router.get('/:aid', (req, res, next) => {
    const appointmentId = req.params.aid;
    const appointments = DUMMY_APPOINTMENT.find(a =>{
        return a.id === appointmentId;
    });

    if (!appointments) {
       return res.status(404).json({message: 'Could not find a appointment for the provided id'});
    }

    res.json({ appointments });
});


router.get('/users/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const appointments = DUMMY_APPOINTMENT.find(a => {
        return a.creator === userId;
    });
    res.json({ appointments });
});


module.exports = router;
