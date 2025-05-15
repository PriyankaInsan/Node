const express = require('express');
const loginRouter= express.Router();
const loginController = require('../controller/loginController');

loginRouter.get('/login',loginController.getLogin);
loginRouter.post('/login',loginController.postLogin);
loginRouter.post('/logout',loginController.postLogout);
loginRouter.get('/signup',loginController.getSignUp);
loginRouter.post('/signup',loginController.postSignUp);

exports.loginRouter= loginRouter;
