const express = require('express');
const router = express.Router();

const calculatorController = require('../controllers/calculatorController');

router.post('/calculate', calculatorController.performCalculation);

module.exports = router;