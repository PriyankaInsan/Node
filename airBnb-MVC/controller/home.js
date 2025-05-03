exports.getHome=(req,res,next)=>{
    res.render('register');
};
const registeredHome=[];
exports.postHome= (req,res,next)=>{
    registeredHome.push(req.body)
    res.render('success');
};
exports.registeredHome= registeredHome;