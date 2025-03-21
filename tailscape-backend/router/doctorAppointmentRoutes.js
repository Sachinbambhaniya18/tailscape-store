const express = require('express');
const {
    createAppointment,
    getAllAppointments,
    getAppointmentsByUser,
    deleteAppointment,
    deleteAppointmentByUser,
    updateAppointmentStatus
} = require('../controller/doctorAppointmentController');

const router = express.Router();

router.post('/doctor-appointments', createAppointment);
router.get('/doctor-appointments', getAllAppointments);
router.get('/doctor-appointments/:userId', getAppointmentsByUser);
router.put('/doctor-appointments/:id/status', updateAppointmentStatus);

module.exports = router;
