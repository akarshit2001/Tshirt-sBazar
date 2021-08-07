const mongoose = require('mongoose');
const{ObjectId}= mongoose.Schema;
const item = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        trim :true
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },// here we are going to link with catmodel schema.
    category:{
        type:ObjectId,
        ref:"catmodel",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true});

module.exports= mongoose.model('prodmodel',item);