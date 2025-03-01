const express = require('express');
const router = express.Router();
const sigup = require('../controllers/signupController');

router.post('/', sigup);

module.exports = router;