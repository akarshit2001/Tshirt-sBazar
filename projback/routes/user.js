const express = require('express');
const  router = express.Router();
const {getParamById, getUsers,updateInfo,purchaseList} = require('../controllers/user');
const {isAuthenticate, isAdmin} = require('../controllers/auth');
router.param("userId",getParamById);// here we get the id.
router.get("/user/:userId",isAuthenticate,isAdmin);
router.get("getUser",getUsers);
router.put("/update/:userId",isAuthenticate,updateInfo);
router.get('/getList/user/:userId',isAuthenticate,purchaseList);
module.exports = router;
