
const db = require("../utils/databaseUtil");
module.exports= class Home{

    constructor(name,price,rating,location,photo,id){
        this.name= name;
        this.photo=photo;
        this.price=price;
        this.rating=rating;
        this.location=location;
        this.id=id;
    }

    save(){
     return db.execute("INSERT INTO homes (name,price,location,rating,photo) VALUES (?,?,?,?,?)",[this.name??"hard",this.price??null,this.location??null,this.rating??null,this.photo??null])
    //     this.id= Math.random().toString();
    //     Home.getRegisteredList().then(([registeredHome])=>{
    //         registeredHome.push(this);
    //         fs.writeFile(homePath, JSON.stringify(registeredHome),error=>{
    //         console.log("File handeling", error);
    //     })
    // })
        
    }

    static getRegisteredList(){
        return db.execute("SELECT * FROM homes");
   }

   static getHomeById(homeId){
     return db.execute("SELECT * FROM homes WHERE id=?",[homeId])
   }

   static deleteHome(homeId){
     return db.execute("DELETE FROM homes WHERE id=?",[homeId])
   }
}
