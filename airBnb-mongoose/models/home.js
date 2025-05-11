const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");
const db= getDB();
module.exports= class Home{

    constructor(name,price,rating,location,photo,_id){
        this.name= name;
        this.photo=photo;
        this.price=price;
        this.rating=rating;
        this.location=location;
        this._id=_id;
    }

    
    save(){
      if(this._id){
        const updated={name: this.name,
          photo:this.photo,
          price:this.price,
          rating:this.rating,
          location:this.location}
        return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:updated});
      }else{
        return db.collection('homes').insertOne(this);
      }
  // return db.execute("INSERT INTO homes (name,price,location,rating,photo) VALUES (?,?,?,?,?)",[this.name??"hard",this.price??null,this.location??null,this.rating??null,this.photo??null])
    }

    static getRegisteredList(){
        return db.collection('homes').find().toArray();
        // return db.execute("SELECT * FROM homes");
   }

   static getHomeById(homeId){
      return db.collection('homes').find({_id:new ObjectId(String(homeId))}).next();
    //  return db.execute("SELECT * FROM homes WHERE id=?",[homeId])
   }

   static deleteHome(homeId){
    return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId))});

    //  return db.execute("DELETE FROM homes WHERE id=?",[homeId])
   }
}
