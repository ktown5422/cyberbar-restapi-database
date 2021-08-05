const { v4: uuid } = require("uuid");


const HttpError = require("../Models/http-error");

const DUMMY_APPOINTMENT = [
    {
        id: 'a1',
        name: 'Kevin',
        price: '$100',
        description: 'cracked screen and battery replacement',
        phoneType: 'iphone X',
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

    const appointments = DUMMY_APPOINTMENT.find(a => {
        return a.creator === userId;
    });

    if (!appointments) {
        return next(
            new HttpError('Could not find appointment for the provided user id')
        );
     }
    
    res.json({ appointments });
};

const createAppointment = (req, res, next) => {
    const { name, price, description, phoneType, creator } = req.body;

    const createdAppointment = {
        name,
        price,
        description,
        phoneType,
        creator
    };

    DUMMY_APPOINTMENT.push(createdAppointment);

    res.status(201).json({appointments: createdAppointment});
}

exports.getAppointmentsById = getAppointmentsById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;
exports.createAppointment = createAppointment;