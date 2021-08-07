const express = require('express');
const router = express();
const {getCategoryId,createCategory,getCategory,getCategories,updateCateg,deleteCateg}= require('../controllers/category')
const {isAdmin,isAuthenticate} = require('../controllers/auth');
const {getParamById} = require('../controllers/user');
// params 
router.param("user",getParamById);
router.param("category",getCategoryId);


// routes
// only admin can create the category
router.post('/category/create/:user',isAuthenticate,isAdmin,createCategory);
router.get('/category/:category',getCategory);
router.get('/category',getCategories);
// for updation
router.put('/category/:category/:user',isAuthenticate,isAdmin,updateCateg);

// for deletion
router.delete('/category/:category/:user',isAuthenticate,isAdmin,deleteCateg);


module.exports = router;