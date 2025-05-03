const express= require('express');
const mainRouter = express.Router();

mainRouter.get('/',(req,res,next)=>{
    console.log("request path and method 1 get",req.url, req.method );
    next();
})
module.exports = mainRouter;