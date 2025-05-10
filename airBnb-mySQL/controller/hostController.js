const Home = require("../models/home");

exports.getHome=(req,res,next)=>{
    res.render('host/edit-home',{editing:false});
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
        if(!home){
            res.redirect('/host/homeList');
        }else{
            res.render('host/edit-home',{home, editing})
        }}
    );
}
exports.postEditHome= (req,res,next)=>{
    const homeData=req.body;
    console.log("homeData",homeData);
    Home.getRegisteredList((registeredHome)=>{
        const updatedList=registeredHome.map((home)=>home.id===homeData.id?homeData:home)
        res.render('host/host-home-list',{registeredHome:updatedList});
    });
}

exports.deleteHome= (req,res,next)=>{
    console.log("in delete");
    const homeId=req.params.homeId;
    console.log("homeId",homeId);
    // res.redirect('/host/homeList');
    Home.deleteHome(homeId,registeredHome=>{
        res.render('host/host-home-list',{registeredHome});
    });
}