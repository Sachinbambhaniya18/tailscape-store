const express = require('express');
const {
    createAppointment,
    getAllAppointments,
    getAppointmentsByUser,
    deleteAppointment,
    deleteAppointmentByUser,
    updateAppointmentStatus
} = require('../controller/storeAppointmentController');

const router = express.Router();

router.post('/store-appointments', createAppointment);
router.get('/store-appointments', getAllAppointments);
router.get('/store-appointments/:userId', getAppointmentsByUser);
router.delete('/store-appointments/user/:userId/appointments/:id', deleteAppointmentByUser);
router.delete('/store-appointments/:id', deleteAppointment);
router.put('/store-appointments/:id/status', updateAppointmentStatus);

module.exports = router;
