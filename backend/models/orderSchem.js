const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    schoolid:{type:String,required:true},
    trusteeid:{type:String,required:true},
    studentinfo:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    gatewayName:{type:String,required:true},

});

module.exports = mongoose.model('Order',orderSchema);
