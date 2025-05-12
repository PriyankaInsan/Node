const express = require('express');
const hostRouter= express.Router();
const homeController = require('../controller/hostController');

hostRouter.get('/home',homeController.getHome);
hostRouter.post('/home',homeController.postHome);
hostRouter.get('/homeList',homeController.getHomeList);
hostRouter.get('/editHome/:homeId',homeController.getEditHome);
hostRouter.post('/editHome',homeController.postEditHome);
hostRouter.post('/deleteHome/:homeId',homeController.deleteHome);



exports.hostRouter= hostRouter;
