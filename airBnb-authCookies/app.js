const express= require('express');
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const rootPath= require('./utils/pathUrl');
const multer= require('multer');
const { default: mongoose } = require('mongoose');
const session = require("express-session");
const MongoDBStore= require("connect-mongodb-session")(session);
const url= 'mongodb+srv://root:Ddstha%407@clusterpk.ykznxhv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterPK';

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootPath,'public')));
app.use(express.static(path.join(rootPath,'uploads')));

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
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const multerOptions= {dest: 'uploads/'};
app.use(multer({storage,fileFilter}).single('photo'));
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
