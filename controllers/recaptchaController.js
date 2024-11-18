const axios = require('axios');

exports.submitContactForm = async (req, res) => {
  const { recaptchaToken } = req.body;

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const response = await axios.post(verificationURL);

    console.log('Vérification reCAPTCHA:', response.data);

    if (!response.data.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    // Continuez avec la logique d'envoi d'email ici...

  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
