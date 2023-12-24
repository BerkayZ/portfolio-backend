const {
    saveContact,
    getContacts,
    setReadContact
} = require('../controller/contactController');
const express = require('express');

const router = express.Router();

router.post('/post', saveContact);
router.get('/get', getContacts);
router.post('/read/:id', setReadContact);

module.exports = router;
