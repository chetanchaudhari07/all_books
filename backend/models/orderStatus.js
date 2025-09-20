const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
   collectId:{type:mongoose.Schema.Types.ObjectId,ref:'Order',required:true},
   orderamount:{type:Number,required:true},
   transactionAmount:{type:Number,required:true},
   paymentMode:{type:String,required:true},
   paymentDetails:{type:String,required:true},
   bankReference:{type:String,required:true},
   paymentMessage:{type:String,required:true},
   status:{type:String,enum:['pending','failed','success'],default:'pending'},
   errorMessage:{type:String},
   paymentTime:{type:Date,default:Date.now}
})

module.exports = mongoose.model('OrderStatus',orderStatusSchema);