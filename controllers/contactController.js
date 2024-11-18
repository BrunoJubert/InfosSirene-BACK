// controllers/contactController.js

const emailjs = require('@emailjs/nodejs');

exports.submitContactForm = async (req, res) => {
  try {
    const { nom, email, message } = req.body;

    if (!nom || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const templateParams = {
      from_name: nom,
      from_email: email,
      message: message,
    };

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      { publicKey: process.env.EMAILJS_PUBLIC_KEY }
    );

    res.status(200).json({ message: 'Votre message a été envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi du message' });
  }
};
