const fs= require('fs');
const path = require('path');
const rootDir = require('../utils/pathUrl');
const { error } = require('console');

let favoriteList=[];
const homePath= path.join(rootDir,'data','homes.json')

module.exports= class Home{

    constructor(home,price,rating,location,photo){
        this.home= home;
        this.photo=photo;
        this.price=price;
        this.rating=rating;
        this.location=location;
    }

    save(){
        this.id= Math.random().toString();
        Home.getRegisteredList((registeredHome)=>{
            registeredHome.push(this);
            fs.writeFile(homePath, JSON.stringify(registeredHome),error=>{
            console.log("File handeling", error);
        })
    })
        
    }

    static getRegisteredList(callback){
        fs.readFile(homePath,(err,data)=>{
            callback(!err?JSON.parse(data):[]);
        })
   }

   static getHomeById(homeId, callback){
        this.getRegisteredList((homes)=>{
            const currentHome=homes.find((home)=>home.id===homeId);
            callback(currentHome);
        })
   }

   static deleteHome(homeId, callback){
        this.getRegisteredList(homes=>{
            const newList=homes.filter(home=>{if(home.id!==homeId){return home}});
            console.log("newList",newList);
            fs.writeFile(homePath, JSON.stringify(newList),error=>{
                console.log("File handeling", error);});
            callback(newList);
        })
   }
}
