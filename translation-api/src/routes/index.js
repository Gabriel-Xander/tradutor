const express = require('express');
const translationRoutes = require('./translationRoutes');

const router = express.Router();

router.use('/translations', translationRoutes);

module.exports = router; 