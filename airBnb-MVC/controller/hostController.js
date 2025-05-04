const Home = require("../models/home");

exports.getHome=(req,res,next)=>{
    res.render('host/edit-home');
};
exports.postHome= (req,res,next)=>{
    const{home,price,rating,location,photo}= req.body;
    const obj= new Home(home,price,rating,location,photo);
    obj.save();
    res.render('host/success');
};
exports.getHomeList= (req,res,next)=>{
    Home.getRegisteredList((registeredHome)=>{
        res.render('host/host-home-list',{registeredHome});
    });
}
exports.getEditHome= (req,res,next)=>{
    const homeId=req.params.homeId;
    const editing= req.query.editing === 'true';
    Home.getHomeById(homeId,home=>{
        console.log("home",home);
        if(!home){
            res.redirect('/host/homeList');
        }else{
            res.render('host/edit-home',{home, editing})
        }}
    );
}
exports.postEditHome= (req,res,next)=>{
    const homeData=res.body;
    console.log("homeData",homeData);
    Home.getRegisteredList((registeredHome)=>{
        res.render('host/edit-home',{registeredHome});
    });
}