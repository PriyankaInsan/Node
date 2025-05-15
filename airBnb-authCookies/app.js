const express= require('express');
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const rootPath= require('./utils/pathUrl');
const { default: mongoose } = require('mongoose');
const session = require("express-session");
const MongoDBStore= require("connect-mongodb-session")(session);
const url= 'mongodb+srv://root:Ddstha%407@clusterpk.ykznxhv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterPK';

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootPath,'public')));

const store= new MongoDBStore({
    uri:url,
    collection:'sessions'
});
app.use(session({
    secret: "PK",
    resave:false,
    saveUninitialized:true,
    store,
}));
app.use(bodyParser.urlencoded());
app.use((req,res,next)=>{
    console.log("req.url, req.method", req.url, req.method);
    next();
});

const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const { loginRouter } = require('./routes/loginRouter');

const { error } = require('./controller/error');
app.use((req,res,next)=>{
    req.isLoggedIn= req.session.isLoggedIn;
    // req.isLoggedIn= req.get('Cookie').split('=')[1]==='true' || false;
    next();
})
app.use(loginRouter);
app.use(userRouter);
app.use("/host", (req,res,next)=>{
    if(req.isLoggedIn){
        next();
    }else{
        res.redirect('/login')
    }
});
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
