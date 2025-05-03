const express = require('express');
const hostRouter= express.Router();
const homeController = require('../controller/home');

hostRouter.get('/host/home',homeController.getHome);
hostRouter.post('/host/home',homeController.postHome)
exports.hostRouter= hostRouter;
