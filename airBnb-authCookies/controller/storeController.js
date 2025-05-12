const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getHome= (req,res,next)=>{
    Home.find().then(registeredHome=>{
        res.render('store/index',{registeredHome});
    });
}

exports.getHomeList= (req,res,next)=>{
    Home.find().then(registeredHome=>{
        res.render('store/home-list',{registeredHome});
    });
}
exports.getHomeDetails= (req,res,next)=>{
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home=>{
        if(!home){
            res.redirect('homeList');
        }else{
            res.render('store/home-details',{home})
        }
    })
}
exports.getBookings= (req,res,next)=>{
    Home.find().then(registeredHome=>{
        res.render('store/bookings',{registeredHome});
    });
}

exports.getfavoriteList= (req,res,next)=>{
    Favorite.find().then(favoriteList=>{
        res.render('store/favorite-list',{favoriteList})
    })
}

exports.postfavoriteList= (req,res,next)=>{
    const homeId = req.body.homeId;
    Favorite.find().then(list=>{
        if(list.some((obj)=>String(obj._id)==String(homeId))){
            res.redirect('homeList')
        }else{
            Home.findById(homeId).then(home=>{
                const favoriteObj = new Favorite({
                    id: home._id,
                    name: home.name,
                    price: home.price,
                    location: home.location,
                    rating: home.rating,
                    photo: home.photo
                });
                favoriteObj.save().then(()=>{
                    res.redirect('favorite');
                });
            })
        }
    })
}