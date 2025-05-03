const express = require('express');
const hostRouter= express.Router();
const path= require('path');
const rootPath= require('../utils/pathUrl');

hostRouter.get('/host/home',(req,res,next)=>{
    res.render('register');
})
const registeredHome=[];
hostRouter.post('/host/home',(req,res,next)=>{
    registeredHome.push(req.body)
    res.render('success');
})
exports.hostRouter= hostRouter;
exports.registeredHome= registeredHome