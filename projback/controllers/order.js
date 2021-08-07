const {Cart,Order} = require('../models/Order');

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id).
    populate("products.product","name price")
    .exec((err,data)=>{
            if(err)
               return res.status(400).json("error to get the order by id");
            req.order =data;
            next();
    })
}


exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,data)=>{
        if(err)
            return res.status(400).json("error while create order!");
        res.json(data)
    })
}

exports.getAllOrder = (req,res)=>{
    Order.find().populate("user","_id name").
    exec((err,data)=>{
        if(err){
            return res.status(400).json("error occured!");
        }
        res.json(data);
    })
}

// to get the orderstatus

exports.getOrderStatus = ()=>{
    return res.json(Order.schema.path("status").enumValue);
}

// to update

exports.updateOrder = (req,res)=>{
    Order.update({
        _id:req.body.orderId
    },{
        $set:{status:req.body.status}
    },(err,data)=>{
        if(err)
            return res.status(400).json(err);
        res.json(data);
    })
}