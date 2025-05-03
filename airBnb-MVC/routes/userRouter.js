const express = require('express')
const userRouter = express.Router();
const { registeredHome } = require('../controller/home');


userRouter.get('/',(req,res,next)=>{
    console.log("register",registeredHome);
    // res.sendFile(path.join(rootPath,'views','home.html'));
    res.render('home',{registeredHome});
});

exports.userRouter= userRouter;