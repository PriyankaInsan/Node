const express = require('express');
const mainRouter = require('./routes/main');
const contactRouter = require('./routes/contact');
const path= require('path')
const pathUrl = require('./utils/pathUrl');
const app= express();

app.use(express.urlencoded({extended:true}));
app.use(mainRouter);
app.use(contactRouter);
app.use((req,res,next)=>{
    res.sendFile(path.join(pathUrl,'views','404.html'))
})
const port=3001;
app.listen(port,()=>{
    console.log(`server running on localhost:${port}`);
})