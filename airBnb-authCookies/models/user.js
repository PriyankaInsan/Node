const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    fname:{type:String, require:[true, 'First Name is required']},
    lname:String,
    email:{type:String, require:[true, 'Email is required'], unique:true},
    password:{type:String, require:[true, 'Password is required']},
    role:{type:String, enum:['user', 'admin'],default:'user',require:[true, 'User Type is required'], enum:['user','admin']},
    // terms:{type:Boolean, require:[true, 'Terms and Conditions are required']},
})

module.exports= mongoose.model('User',userSchema);
