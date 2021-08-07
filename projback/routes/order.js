const express= require('express');
const router = express.Router();
const {isAdmin,isAuthenticate} = require('../controllers/auth');
const {getParamById,pushItemInList} = require('../controllers/user');
const{getOrderById,createOrder,getAllOrder,getOrderStatus,updateOrder }= require('../controllers/order')
const {updateStock}= require('../controllers/product')
// for params 
router.param("userId",getParamById);
router.param("orderId",getOrderById);

// for the actual route

router.post("/order/createOrder/:userId",isAuthenticate,pushItemInList,updateStock,createOrder);

// read

router.get("order/all/:userId",isAuthenticate,getAllOrder);
// get routes
router.get("order/status/:userId",isAuthenticate,isAdmin,getOrderStatus);
// update
router.get("order/:orderId/status/:userId",isAuthenticate,updateOrder );

module.exports = router;