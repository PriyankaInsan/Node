const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const { error } = require("./error");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{isLoggedIn:req.isLoggedIn, error:[], oldInput:{},user:{}});
};
exports.postLogin= async(req,res,next)=>{
    const {email, password}= req.body;
    const user= await User.findOne({email});
    if(!user){
        return res.status(422).render('auth/login',{
            isLoggedIn:req.isLoggedIn,
            error: ['Email not registered'],
            oldInput: req.body,
            user:{},
        });
    }
    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(422).render('auth/login',{
            isLoggedIn:req.isLoggedIn,
            error: ['Invalid Password'],
            oldInput: req.body,
            user:{},
        });
    }
    req.session.isLoggedIn=true;
    req.session.user=user;
    await req.session.save();
    // res.cookie('isLoggedIn',true);
    res.redirect('/');
};

exports.postLogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
    // res.cookie('isLoggedIn',false);
};

exports.getSignUp=(req,res,next)=>{
    res.render('auth/signup',{isLoggedIn:false, error:[], oldInput:{},user:{}});
};
exports.postSignUp=[
    check('fname').isLength({min:3}).withMessage('Please enter a valid First Name'),
    check('lname').isLength({min:3}).withMessage('Please enter a valid Last Name'),
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check('password').matches(/[A-Z]/).withMessage('Password at least contains one uppercase letter').matches(/[a-z]/).withMessage('Password at least contains one lowercase letter').matches(/\d/).withMessage('Password at least contains one number').matches(/[@$!%*?&]/).withMessage('Password at least contains one special character').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    check('cpassword').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    check('role').notEmpty().withMessage('User Type is required').isIn(['user','admin']).withMessage('Please select a valid user type'),
    check('terms').notEmpty().withMessage('Please accept the terms and conditions'),
    (req,res,next)=>{
    const data= req.body;
    const errors= validationResult(req);
    console.log("data",data);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup',{
            isLoggedIn:false,
            error: errors.array().map(err=>err.msg),
            oldInput: data,
            user:{},
        });
    }
    bcrypt.hash(data.password, 12).then(hashPassword=>{
        const obj= new User({
            fname:data.fname,
            lname:data.lname,
            email:data.email,
            password:hashPassword,
            role:data.role,
        });
        return obj.save();
    }).then(()=>{
        console.log("User saved successfully");
        res.redirect('/login');
    }).catch(err=>{
        console.log("Error in saving user", err);
        if(err.code===11000){
            return res.status(422).render('auth/signup',{
                isLoggedIn:false,
                error: ['Email already exists'],
                oldInput: data,
                user:{},
            });
        }
        res.status(500).render('auth/signup',{
            isLoggedIn:false,
            error: [err.message,'Internal server error'],
            oldInput: data,
            user:{},
        });
    })
    // req.session.isLoggedIn=true;
    // res.cookie('isLoggedIn',true);
}];