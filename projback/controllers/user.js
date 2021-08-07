const User = require('../models/user');
const Order = require('../models/Order');
exports.getParamById= (req,res,next,id)=>{
    User.findById(id,(err,user)=>{
        if(err || !user){
            return res.json({message:"errr"})
        }
        console.log(`profile is `)
        req.profile = user;// profile is a call back function.
        console.log(req.profile)
        next();
    })

}
exports.getUsers =(req,res)=>{
    // TODO for pasword.
    User.find({},(err,data)=>{
        if(err){
            return res.status(404).json({message:"error"});
        }
       return res.json(data);
    })
    

}
exports.updateInfo= (req,res)=>{
    User.findByIdAndUpdate({_id:req.profile._id},{$set:req.body},{new:true,useFindModify:false},(err,data)=>{
        if(err){
            return res.status(400).json({err:"sorry it;s wrong!"});
        }
        res.json(data);
    })

}

exports.purchaseList = (req,res)=>{
    Order.find({user:req.profile._id}).populate("user","_id name ").exec((err,data)=>{
        if(err){
          return   res.status(403).json({error:err});
        }
        return res.json(data);
        
    })
}
// middleware to store the item in list
exports.pushItemInList = (req,res,next)=>{
    let purchase= [];
    req.profile.Order.products.forEach(product => {
            purchase.push({
                _id:product._id,
                name:product.name,
                description:product.description,
                category:product.category,
                quantity :product.quantity,
                amount:req.body.Order.amount,
                transaction :req.body.Order.transaction

            })        
    });
    // to save in db
    User.findByIdAndUpdate(
        {_id:req.profile._id}
        ,{$push:{purchase:purchase}},
        {new:true},(err,data)=>{
            if(err){
                return res.status(403).json({message:err})
            }
        
        }
        )
next()
}
