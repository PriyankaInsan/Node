const express= require('express');
const {userRouter} = require('./routes/userRouter')
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const {hostRouter} = require('./routes/hostRouter');
const rootPath= require('./utils/pathUrl');

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootPath,'public')));

app.use(bodyParser.urlencoded());
app.use((req,res,next)=>{
    console.log("req.url, req.method", req.url, req.method);
    next();
});
app.use(userRouter);
app.use(hostRouter);
app.use((req,res,next)=>{
    res.status(404).render('404Found');
})
app.listen(3002,()=>{
    console.log("starting airbnb 3002");
})