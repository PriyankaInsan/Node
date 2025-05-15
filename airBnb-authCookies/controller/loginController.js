const { check, validationResult } = require("express-validator");

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{isLoggedIn:req.isLoggedIn});
};
exports.postLogin=(req,res,next)=>{
    const data= req.body;
    // console.log("data",data);
    req.session.isLoggedIn=true;
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
    res.render('auth/signup',{isLoggedIn:false});
};
exports.postSignUp=[
    check('fname').isLength({min:3}).withMessage('Please enter a valid First Name'),
    check('lname').isLength({min:3}).withMessage('Please enter a valid Last Name'),
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check('password').matches(/A-Z/).withMessage('Password at least contains one uppercase letter').matches(/[a-z]/).withMessage('Password at least contains one lowercase letter').matches(/\d/).withMessage('Password at least contains one number').matches(/[@$!%*?&]/).withMessage('Password at least contains one special character').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    check('cpassword').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    check('role').notEmpty().withMessage('User Type is required').isIn(['user','admin']).withMessage('Please select a valid user type'),
    check('terms').isBoolean().withMessage('Please accept the terms and conditions'),
    (req,res,next)=>{
    const data= req.body;
    const errors= validationResult(req);
    console.log("data",data);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup',{
            isLoggedIn:false,
            error: errors.array().map(err=>err.msg),
            oldInput: data
        });
    }
    // req.session.isLoggedIn=true;
    // res.cookie('isLoggedIn',true);
    res.render('/login');
}];