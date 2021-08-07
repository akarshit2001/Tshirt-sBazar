// here the oder is from the add to cart page so first we have to create that schema
// add to cart is linked with product schema because after that page user will come on tht.
// let's move on!
const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema;

const Addtocart = new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"prodmodel"
    },
    name:String,
    price:Number,
    count:Number
});

const order= new mongoose.Schema({

        products:[Addtocart],
        transaction_id:{},
        amount:Number,
        address:String,
        update:Date,
        status:{
            type:String,
            default:"recieved",
            enum:["recieved,cancelled, ordered, booked"]// these are the default word which will be use by 
            //the user 
        },
        user:{
            type:ObjectId,
            ref:"user"
        }

},{timestamps:true});

// to export both schema 

const Cart= mongoose.model('cart',Addtocart);
const Order=mongoose.model('Order',order);
module.exports={Cart,Order};