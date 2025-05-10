const { registeredHome } = require("../../airBnb/routes/hostRouter");
const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome= (req,res,next)=>{
    Home.getRegisteredList((registeredHome)=>{
        res.render('store/index',{registeredHome});
    });
}

exports.getHomeList= (req,res,next)=>{
    Home.getRegisteredList((registeredHome)=>{
        res.render('store/home-list',{registeredHome});
    });
}
exports.getHomeDetails= (req,res,next)=>{
    const homeId = req.params.homeId;
    Home.getHomeById(homeId,home=>{
        if(!home){
            res.redirect('homeList');
        }else{
            res.render('store/home-details',{home})
        }
    })
}
exports.getBookings= (req,res,next)=>{
    Home.getRegisteredList((registeredHome)=>{
        res.render('store/bookings',{registeredHome});
    });
}

exports.getfavoriteList= (req,res,next)=>{
    Favorite.getFavoriteList(favoriteList=>{
        Home.getRegisteredList((registeredHome)=>{
            const result=favoriteList.map(id=> registeredHome.find(home=>home.id===id));
            res.render('store/favorite-list',{favoriteList:result})

        });
    })
}

exports.postfavoriteList= (req,res,next)=>{
    const homeId = req.body.homeId;
    Favorite.postFavoriteList(homeId,favoriteList=>{
        console.log("favoriteList",favoriteList);
        if(!favoriteList){
            res.redirect('homeList')
        }else{
            Home.getRegisteredList((registeredHome)=>{
                const result=favoriteList.map(id=> registeredHome.find(home=>home.id===id));
                console.log("result", result);
                res.render('store/favorite-list',{favoriteList:result})

            });
        }
    })
}