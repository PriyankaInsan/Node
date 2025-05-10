const Home = require("../models/home");

exports.getHome=(req,res,next)=>{
    res.render('host/edit-home',{editing:false});
};
exports.postHome= (req,res,next)=>{
    const{name,price,rating,location,photo}= req.body;
    const obj= new Home(name,price,rating,location,photo);
    obj.save().then(()=>{
        console.log("Home saved successfully");
    });
    res.render('host/success');
};
exports.getHomeList= (req,res,next)=>{
    Home.getRegisteredList().then(([registeredHome])=>{
        res.render('host/host-home-list',{registeredHome});
    });
}
exports.getEditHome= (req,res,next)=>{
    const homeId=req.params.homeId;
    const editing= req.query.editing === 'true';
    Home.getHomeById(homeId).then(([homes])=>{
        const home= homes[0];
        if(!home){
            res.redirect('/host/homeList');
        }else{
            res.render('host/edit-home',{home, editing})
        }}
    );
}
exports.postEditHome= (req,res,next)=>{
    const homeData=req.body;
    Home.getRegisteredList().then(([registeredHome])=>{
        console.log("in edit registeredHome",registeredHome,"");
        console.log("in edit homeData",homeData,"");

        const updatedList=registeredHome.map((home)=>home.id===Number(homeData.id)?homeData:home)
        res.render('host/host-home-list',{registeredHome:updatedList});
    });
}

exports.deleteHome= (req,res,next)=>{
    const homeId=req.params.homeId;
    Home.deleteHome(homeId).then(()=>{
        res.redirect('/host/homeList');
    }).catch(err=>{
        console.log("error in deleting", err);
    });
}