const mongoose = require("mongoose");
const Favorite = require("./favorite");

const homeSchema= mongoose.Schema({
    name:{type:String, require:true},
    price:{type:Number, require:true},
    location:{type:String, require:true},
    rating:Number,
    photo:String,
})

homeSchema.pre('findOneAndDelete',async function(next){
  console.log("in pre");
  const id= this.getQuery()._id;
  console.log("id",id);
  await Favorite.findOneAndDelete({id}).then((res)=>{
    console.log("res",res);
    console.log("deleted successfully");
  })
  next();
})
module.exports= mongoose.model('Home',homeSchema);