// routes/recaptchaRoutes.js

const express = require('express');
const router = express.Router();
const recaptchaController = require('../controllers/recaptchaController');

// Route pour vérifier le reCAPTCHA
router.post('/verify', recaptchaController.verifyRecaptcha, (req, res) => {
  res.json({ message: 'reCAPTCHA verification successful' });
});

module.exports = router;
