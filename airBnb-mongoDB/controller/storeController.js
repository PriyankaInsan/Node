const { ObjectId } = require("mongodb");
const { registeredHome } = require("../../airBnb/routes/hostRouter");
const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome= (req,res,next)=>{
    Home.getRegisteredList().then(registeredHome=>{
        res.render('store/index',{registeredHome});
    });
}

exports.getHomeList= (req,res,next)=>{
    Home.getRegisteredList().then(registeredHome=>{
        res.render('store/home-list',{registeredHome});
    });
}
exports.getHomeDetails= (req,res,next)=>{
    const homeId = req.params.homeId;
    Home.getHomeById(homeId).then(home=>{
        if(!home){
            res.redirect('homeList');
        }else{
            res.render('store/home-details',{home})
        }
    })
}
exports.getBookings= (req,res,next)=>{
    Home.getRegisteredList().then(registeredHome=>{
        res.render('store/bookings',{registeredHome});
    });
}

exports.getfavoriteList= (req,res,next)=>{
    Favorite.getFavoriteList().then(favoriteList=>{
        res.render('store/favorite-list',{favoriteList})
    })
}

exports.postfavoriteList= (req,res,next)=>{
    const homeId = req.body.homeId;
    Favorite.getFavoriteList().then(list=>{
        if(list.some((obj)=>String(obj._id)==String(homeId))){
            res.redirect('homeList')
        }else{
            Home.getHomeById(homeId).then(home=>{
                Favorite.postFavoriteList(home).then(()=>{
                    res.redirect('favorite');
                });
            })
        }
    })
}