// middleware/verifyRecaptcha.js

const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  const recaptchaToken = req.body['g-recaptcha-response'];
  
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is missing' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY.trim();
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const response = await axios.post(verificationURL);
    
    if (response.data.success) {
      next();
    } else {
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    res.status(500).json({ error: 'Internal server error during reCAPTCHA verification' });
  }
};

module.exports = verifyRecaptcha;
