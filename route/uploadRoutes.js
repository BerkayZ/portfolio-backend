const {uploadImage} = require('../controller/uploadController');
const express = require('express');

const router = express.Router();

router.post('/image', uploadImage);

module.exports = router;
