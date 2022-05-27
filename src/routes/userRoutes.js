const express = require('express');
const { validateUserRegister, validateUserLogin } = require('../middleware');

const userRoute = express.Router();

const controller = require('../controllers/userController');

userRoute.post('/register', validateUserRegister, controller.userRegistration);

userRoute.post('/login', validateUserLogin, controller.userLogin);

module.exports = userRoute;
