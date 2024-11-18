const express = require('express');
const userController = require('../controllers/userController');
const middleware = require ('../middleware/jwtAuth');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/me', middleware,userController.getUserByToken);
router.post('/login', userController.login);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
