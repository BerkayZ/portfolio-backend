const {login} = require('../controller/authController');
const express = require('express');

const router = express.Router();

router.post('/login', login);

module.exports = router;
