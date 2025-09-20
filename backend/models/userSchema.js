const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    id:{type:String,required:true,unique:true},
    role:{type:String,enum:['student','admin'],default:'student'},
},{timestamps:true});       

module.exports = mongoose.model('User',userSchema);