const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./router/authRoutes');
const productRoutes = require('./router/productRoutes');
const petRoutes = require('./router/petRoutes');
const breedRoutes = require('./router/breedRoutes');
const appointmentRoutes = require('./router/storeAppointmentRoutes');
const contactRouters = require('./router/contactRouters');
const vetHospitalRoutes = require('./router/vetHospitalRoutes');
const doctorRoutes = require('./router/doctorRoutes');
const doctorAppointmentRoutes=  require('./router/doctorAppointmentRoutes');
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pets', petRoutes);
app.use('/api', breedRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', contactRouters);
app.use('/api/vetHospitals',vetHospitalRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/doctorAppointments', doctorAppointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;