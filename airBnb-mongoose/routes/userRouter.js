const express = require('express')
const userRouter = express.Router();
const storeController = require('../controller/storeController');

userRouter.get('/',storeController.getHome);
userRouter.get('/homeList',storeController.getHomeList);
userRouter.get('/homeList/:homeId',storeController.getHomeDetails);
userRouter.get('/bookings',storeController.getBookings);
userRouter.get('/favorite',storeController.getfavoriteList);
userRouter.post('/favorite',storeController.postfavoriteList);

exports.userRouter= userRouter;