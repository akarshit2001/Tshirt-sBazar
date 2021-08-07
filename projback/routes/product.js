const express= require('express');
const router = express.Router();
const {getProductById,createProduct,getProduct,updateProduct,deleteProduct,getAllProduct, photo}= require('../controllers/product')
const {isAdmin,isAuthenticate} = require('../controllers/auth');
const {getParamById} = require('../controllers/user');

// for params 
router.param("userId",getParamById);
router.param("productId",getProductById);

// for the actual route

router.post("/product/createProduct/:userId",isAuthenticate,isAdmin,createProduct);

// read

router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo)

// for update

router.put("/product/:productId/:userId",isAuthenticate,isAdmin,updateProduct);

//  for delete 

router.delete("/product/:productId/:userId",isAuthenticate,isAdmin,deleteProduct)


//listing route
router.get("/product",getAllProduct);
module.exports = router;