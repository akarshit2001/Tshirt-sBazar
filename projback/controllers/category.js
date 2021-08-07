const Category = require('../models/category')

exports.getCategoryId = (req,res,next,id)=>{

        Category.findById(id).exec((err,cat)=>{
            if(err){
                console.log("df")
                return res.status(400).json({error:err})}
            req.category = cat;
            console.log(req.Category);
            next();
        })
        
    }


// create the category
exports.createCategory = (req,res)=>{
    const categ = new Category(req.body);
    categ.save((err,data)=>{
        if(err)
            return res.status(403).json(err);
        res.json(data);
    })
}


// read the category
exports.getCategory =(req,res)=>{

    return res.json(req.category);

}

exports.getCategories = (req,res)=>{
    Category.find().exec((err,data)=>{
        if(err)
            res.status(403).json(err);
        
        res.json(data);
    })
}


// update category
exports.updateCateg = (req,res)=>{

    const category = req.category;
    category.name = req.body.name;
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
     
    });
   
}


// delete category
exports.deleteCateg = (req,res)=>{

    const categ  = req.category;
    categ.remove((err,data)=>{
        if(err)
            return res.status(403).json({error});
        res.json({message:`${data} is deleted sucessfully`})
    })

}