const express = require('express');
const router = express();
const {isAdmin,isAuthenticate} = require('../controllers/auth');
const { getToken,payemnt} = require('../controllers/payment');


// route to get token from server to client which stores all of its information regarding payement

router.get('/gateway/:userId',isAuthenticate,getToken);

router.post('/gateway/payment/:userId',isAuthenticate,payemnt);

module.exports = router;