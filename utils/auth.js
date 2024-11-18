// utils/auth.js
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  hashPassword: async (password) => {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        const hashedPassword = salt + ':' + derivedKey.toString('hex');
        resolve(hashedPassword);
      });
    });
  },

  verifyPassword: async (storedPassword, suppliedPassword) => {
    return new Promise((resolve, reject) => {
      const [salt, hash] = storedPassword.split(':');
      crypto.scrypt(suppliedPassword, salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        const isValid = hash === derivedKey.toString('hex');
        resolve(isValid);
      });
    });
  },

  generateJWTToken: (user) => {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  }
};
