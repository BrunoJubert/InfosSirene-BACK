// middleware/jwtAuth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.developper= 'bubu';
    req.userData = { userId: decodedToken.id, email: decodedToken.email };   
     
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentification échouée' });
  }
};


