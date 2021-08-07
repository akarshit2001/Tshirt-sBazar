const express = require('express');
const router = express();
const { check, validationResult } = require('express-validator');
const {login,signup,signOut,isSignedIn} = require('../controllers/auth');
const {getParamById}= require('../controllers/user');
router.post('/signup',[
    check("name","length should be greater thnm 3").isLength({min:3}),
    check("email","invalid email").isEmail()

],signup);


router.post('/login',[
   // check("password","length should be greater thn 11").isLength({min:5}),
    //check("email","invalid email").isEmail()

],login);

router.get("/signout", signOut);


module.exports = router;
