const Product= require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .exec((err,data)=>{
            if(err){
                return res.status(403).json(err);
            }
            req.product = data;
            next();
    })
    
}

// for create product;
exports.createProduct = (req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions= true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json(err);
        }
    //TODO: restriction of field


    // destructuring of field
    console.log("Fcx")
    const {name,description,price,category,stock}= fields;
    if(!name || !description || !price || !category || !stock){

        return res.status(400).json({error:"Enter all the field."})
    }

    let product = new Product(fields);
        // first check the size of file 
        if(file.photo){
            console.log(file.photo.size)
    if(file.photo.size>3145728444444){

        return res.status(400).json("file too big");
    }
    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = file.photo.type;

        }
    // to save the data
    product.save((err,data)=>{
            if(err){
                return res.status(400).json("file not save");

            }
            //console.log(data)
           
            res.json(data);
        })
    })


}
// to getproduct 

exports.getProduct = (req,res)=>{
    
    return res.json(req.product);
}


// getAll product

exports.getAllProduct = (req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit):8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find().
    select("-photo").
    populate("category").
    limit(limit).
    sort([[sortBy,"asc"]]).
    exec((err,data)=>{
        if(err)
            return res.status(400).json({message:"error to load products!"});
        res.json(data);
    })
}
// get photo
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  };
  

// for updattion 

exports.updateProduct = (req,res)=>{
        console.log("yaha hai")
    let form = formidable.IncomingForm();
    form.keepExtensions= true;
    form.parse(req,(err,fields,file)=>{
        console.log("njn")
        if(err){
            return res.status(400).json({message:"galat"});
        }
 

    let product = req.product;
        // first check the size of file 

    product = _.extend(product,fields);// fields update inside the product;

        
    if(file.photo){
        if(file.photo.size>3145728){
        return res.status(400).json("file too big");
    }
    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = file.photo.type;

        }
    // to save the data
    product.save((err,data)=>{
            if(err){
                return res.status(400).json({error:"upload failed!"});

            }
            res.json(data);
        })
    })

}

// for deletion 

exports.deleteProduct = (req,res)=>{
        console.log("check it now!")
        let product = req.product;
        product.remove((err,data)=>{
            if(err){
                return res.status(400).json(err);
            }
            res.json({
                message:"product is deleted sucessfully!"
            });
        })
}

// for updating stock

exports.updateStock = (req,res,next)=>{
    let operation = req.body.order.products.map((prod)=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}// prod.count is from front end.

            }
        }
    })

    Product.bulkWrite(operation,{},(err,data)=>{
        if(err){
            return res.status(400).json("error during updation.");
        }
        next();
    })

}