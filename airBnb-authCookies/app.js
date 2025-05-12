const express= require('express');
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const rootPath= require('./utils/pathUrl');
const { default: mongoose } = require('mongoose');
const url= 'mongodb+srv://root:Ddstha%407@clusterpk.ykznxhv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterPK';

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootPath,'public')));

app.use(bodyParser.urlencoded());
app.use((req,res,next)=>{
    console.log("req.url, req.method", req.url, req.method);
    next();
});
const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const { error } = require('./controller/error');

app.use(userRouter);
app.use("/host", hostRouter);
app.use(error);
mongoose.connect(url).then(()=>{
    console.log("connected to mongoose");
    app.listen(3002,()=>{
        console.log("starting airbnb 3002");
    })
}).catch((err)=>{
    console.log("Error on connecting mongoose", err);
})
