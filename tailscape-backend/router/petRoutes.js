const express = require('express');
const { getAllPets, getPetById, createPet, updatePet, deletePet } = require('../controller/petController');

const router = express.Router();

router.get('/:id', getPetById);

router.get('/', getAllPets);
router.post('/create-pet', createPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);

module.exports = router;