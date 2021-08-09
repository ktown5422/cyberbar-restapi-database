const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator")


const HttpError = require("../Models/http-error");

let DUMMY_APPOINTMENT = [
    {
        id: 'a1',
        name: 'Kevin',
        price: '$100',
        description: 'cracked screen and battery replacement',
        phoneType: 'iphone X',
        date: '10:00',
        creator: 'u1',
    }
];


const getAppointmentsById = (req, res, next) => {
    const appointmentId = req.params.aid;
    const appointments = DUMMY_APPOINTMENT.find(a =>{
        return a.id === appointmentId;
    });

    if (!appointments) {
       throw new HttpError('Could not find appointment for the provided id', 404);
    }

    res.json({ appointments });
};

const getAppointmentsByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const appointments = DUMMY_APPOINTMENT.filter(a => {
        return a.creator === userId;
    });

    if (!appointments || appointments.length === 0) {
        return next(
            new HttpError('Could not find appointments for the provided user id')
        );
     }
    
    res.json({ appointments });
};

const createAppointment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { name, price, description, phoneType, date, creator } = req.body;

    const createdAppointment = {
        name,
        price,
        description,
        phoneType,
        date,
        creator
    };

    DUMMY_APPOINTMENT.push(createdAppointment);

    res.status(201).json({appointments: createdAppointment});
};

const updateAppointment = (req, res, next) => {
    const { name, price, description, phoneType, date } = req.body;
    const appointmentId = req.params.aid;

    const updatedAppointment = { ...DUMMY_APPOINTMENT.find(a => a.id === appointmentId) };
    const appointmentIndex = DUMMY_APPOINTMENT.findIndex(a => a.id === appointmentId);
    updatedAppointment.name = name;
    updatedAppointment.price = price;
    updatedAppointment.description = description;
    updatedAppointment.phoneType = phoneType;
    updatedAppointment.date = date;

    DUMMY_APPOINTMENT[appointmentIndex] = updatedAppointment;

    res.status(200).json({appointments: updatedAppointment});
};

const deleteAppointment = (req, res, next) => {
    const appointmentId = req.params.aid;
    DUMMY_APPOINTMENT = DUMMY_APPOINTMENT.filter(a => a.id !== appointmentId);
    res.status(200).json({message: 'Deleted Appointment'});
};

exports.getAppointmentsById = getAppointmentsById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;
exports.createAppointment = createAppointment;
exports.updateAppointment = updateAppointment;
exports.deleteAppointment = deleteAppointment;