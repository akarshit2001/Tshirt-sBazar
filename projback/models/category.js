const mongoose = require('mongoose');

const cat_schema= new  mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:30
    }
},{timeStamp:true});


module.exports= mongoose.model('catmodel',cat_schema);
