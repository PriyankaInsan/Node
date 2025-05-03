const express= require('express');
const path = require('path');
const contactRouter = express.Router();
const rootPath = require('../utils/pathUrl');

contactRouter.get('/contact-us',(req,res,next)=>{
    console.log("request path and method /contact-us get",req.url, req.method );
    res.sendFile(path.join(rootPath,"views","contact.html"))
})

contactRouter.post('/contact-us',(req,res,next)=>{
    console.log("in post", req.body);
    res.sendFile(path.join(rootPath,"views","success.html"))
})
module.exports = contactRouter;