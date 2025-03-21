const express = require('express');
const { getAllBreeds } = require('../controller/breedController');

const router = express.Router();

router.get('/breeds', getAllBreeds);

module.exports = router;
