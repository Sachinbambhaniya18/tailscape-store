const express = require('express');
const router = express.Router();
const { contactMessage } = require('../controller/contactController');

router.post('/contact-message', contactMessage);

module.exports = router;
