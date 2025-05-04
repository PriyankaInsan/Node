const fs= require('fs');
const path = require('path');
const rootDir = require('../utils/pathUrl');
const { error } = require('console');
const Home = require('./home');

const favPath= path.join(rootDir,'data','favorite.json')

module.exports= class Favorite{

   static getFavoriteList(callback){
        fs.readFile(favPath,(err,data)=>{
            console.log("err", err, "data", data);
            callback(!err?JSON.parse(data):[]);
        })
    }

    static postFavoriteList(homeId,callback){
        Favorite.getFavoriteList(favoriteList=>{
            console.log("in post", favoriteList, homeId);
            if(favoriteList.includes(homeId)){
                callback(null);
            }else{
                favoriteList.push(homeId);
                console.log("favorite", favoriteList);
                fs.writeFile(favPath,JSON.stringify(favoriteList),(err) => {
                    if (err) {
                        console.error('Failed to write to favorite.json:', err);
                        callback(null);
                    } else {
                        callback(favoriteList);
                    }
                });
            }
        });
    }
}
