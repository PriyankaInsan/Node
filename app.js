// const http = require("http");
const express = require("express");
const app= express();
// const handler = require('./form');
const exp = require("constants");
app.use('/',(req,res,next)=>{
    console.log("first", req.url);
    res.send(`<h1>hi from express</h1>${console.log('send')}`)
    next();
    console.log("first end", req.method);

})
app.use('/submit',(req,res,next)=>{
    console.log("second", req.url);
    next();
    console.log("second end",req.method);

})
// const server= http.createServer(app);

app.listen(3000, () => {
  console.log("server started on 3000");
});

