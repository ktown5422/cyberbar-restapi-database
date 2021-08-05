const HttpError = require("../Models/http-error");

const DUMMY_APPOINTMENT = [
    {
        id: 'a1',
        phone: 'iphone X',
        notes: 'cracked screen and battery replacement',
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


exports.getAppointmentsById = getAppointmentsById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;