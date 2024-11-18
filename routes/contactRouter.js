// routes/contactRouter.js

const express = require('express');
const router = express.Router();
const verifyRecaptcha = require('../middleware/verifyRecaptcha');
const contactController = require('../controllers/contactController');

router.post('/contact', verifyRecaptcha, contactController.submitContactForm);

module.exports = router;
