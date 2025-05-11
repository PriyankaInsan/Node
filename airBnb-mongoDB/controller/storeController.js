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
    Favorite.getFavoriteList().then(([favoriteList])=>{
        Home.getRegisteredList().then(registeredHome=>{
            console.log("favoriteList,", favoriteList);
            console.log("registeredHome,", registeredHome);
            const result=favoriteList.map(id=> registeredHome.find(home=>home._id===id.id));
            console.log("result in get",result);
            res.render('store/favorite-list',{favoriteList:result})

        });
    })
}

exports.postfavoriteList= (req,res,next)=>{
    const homeId = req.body.homeId;
    Favorite.getFavoriteList().then(([list])=>{
        console.log("list",list,"homeId",homeId);
        if(list.some((obj)=>obj.id===Number(homeId))){
            res.redirect('homeList')
        }else{
            Favorite.postFavoriteList(homeId).then(()=>{
                console.log("posted");
                res.redirect('favorite');
            });
        }
    })
}