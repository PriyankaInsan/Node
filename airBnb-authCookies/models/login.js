const mongoose = require("mongoose");

const loginSchema= mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:'Home', require:true, unique:true},
    name:{type:String, require:true},
    price:{type:Number, require:true},
    location:{type:String, require:true},
    rating:Number,
    photo:String,
})

module.exports= mongoose.model('Login',loginSchema);
