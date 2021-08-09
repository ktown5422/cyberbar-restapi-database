const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator")


const HttpError = require("../Models/http-error");
const Appointment = require("../Models/Appointment");

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


const getAppointmentsById = async (req, res, next) => {
    const appointmentId = req.params.aid;
    let appointments;

    try{
        appointments = await Appointment.findById(appointmentId);
    } catch (err) {
        const error = new HttpError('Could not find appointment, Something went wrong', 500);
        return next(error);
    }

    if (!appointments){
        const error = new HttpError('Could not find appointment for the provided id', 404);
        return next(error);
    }
    
    res.json({ appointments: appointments.toObject({getters: true})}); // toObject is a method to help trasform _id to regular id
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

const createAppointment = async (req, res, next) => {

    const { name, price, description, phoneType, appointmentDate, appointmentTime, creator } = req.body;

    const createdAppointment = new Appointment({
        name,
        price,
        description,
        phoneType,
        appointmentDate,
        appointmentTime,
        creator
    });

    try{
        await createdAppointment.save();
    } catch (err) {
        const error = new HttpError(
            'Creating appointment failed, please try again',
            500
        );
        return next(error);
    }

    res.status(201).json({ appointments: createdAppointment });
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