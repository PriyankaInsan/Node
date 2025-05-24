const Home = require("../models/home");
const fs = require('fs');
exports.getHome=(req,res,next)=>{
    res.render('host/edit-home',{editing:false,isLoggedIn:req.isLoggedIn,user:req.session.user});
};
exports.postHome= (req,res,next)=>{
    const{name,price,rating,location}= req.body;
    const photo=req.file.path;
    console.log("req.body postHome",req.body, photo);

    const obj= new Home({name,price,rating,location,photo});
    obj.save().then(()=>{
        console.log("Home saved successfully");
    });
    res.render('host/success',{isLoggedIn:req.isLoggedIn,user:req.session.user});
};
exports.getHomeList= (req,res,next)=>{
    Home.find().then(registeredHome=>{
        res.render('host/host-home-list',{registeredHome,isLoggedIn:req.isLoggedIn,user:req.session.user});
    });
}
exports.getEditHome= (req,res,next)=>{
    const homeId=req.params.homeId;
    const editing= req.query.editing === 'true';
    Home.findById(homeId).then(home=>{
        if(!home){
            res.redirect('/host/homeList');
        }else{
            res.render('host/edit-home',{home, editing,isLoggedIn:req.isLoggedIn,user:req.session.user})
        }}
    );
}
exports.postEditHome= (req,res,next)=>{
    const {name,price,rating,location,photo,id}=req.body;
    Home.findById(id).then((homeDetails)=>{
        homeDetails.name=name;
        homeDetails.price=price;
        homeDetails.rating=rating;
        homeDetails.location=location;
        homeDetails.photo=req.file?req.file.path:photo;
        homeDetails.id=id;
        if(req.file){
            fs.unlink(homeDetails.photo, (err)=>{
                if(err){
                    console.log("error in deleting old file", err);
                }else{
                    console.log("old file deleted");
                }
            });
        }
        homeDetails.save().then(result=>{
            console.log("result", result);
        });
        res.redirect('/host/homeList');
    })
    
}

exports.deleteHome= (req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findByIdAndDelete(homeId).then(()=>{
        res.redirect('/host/homeList');
    }).catch(err=>{
        console.log("error in deleting", err);
    });
}