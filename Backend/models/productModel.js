const mongoose = require("mongoose");
const  Schema  = mongoose.Schema ;

const productSchmea =  Schema({
    Name:{
        type:String , 
        required : true
    },
    Price :{
        type : Number , 
        required : true
    }
} , {timestamps : true});

const productModel = mongoose.model("Product",productSchmea);

module.exports = productModel;