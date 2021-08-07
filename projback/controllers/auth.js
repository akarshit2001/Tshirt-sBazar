const User = require('../models/user');
const express = require('express')
const app = express();

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const { check, validationResult } = require('express-validator');
exports. signup = (req,res)=>{
   
const errors = validationResult(req);

if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].param });
  }
    const user = new User(req.body);
    user.save((err,data)=>{
        console.log(err);
        if(err){
        return res.status(400).json({"message":"sorry it's bad request!"})
    }
       res.json({
            name:data.name,
            lastName:data.lastName,
            email:data.email,
            password:data.password,
            userInfo:data.userInfo,
            Role:data.Role
         
        })

console.log(data);
    })
}


exports.login = (req,res)=>{
    const errors = validationResult(req);
   const {email,password}= req.body;
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg});
  }
  User.findOne({email},(err,data)=>{
    console.log(err)
    console.log(data)
      if(err || !data){
         return res.status(400).json({error:"Email is not found"});
      }
      if(!data.generateAutheticate(password)){
          return res.status(400).json({error:" Email or Password is not match."})
      }
      console.log(data._id)
      const token = jwt.sign({_id:User.id},process.env.SECRET);
      res.cookie("token",token,{  expires:new Date(Date.now()+600000)})
  
      // send data to frontend
      const {name,lastName,email,_id,Role}= data;
     return res.status(200).json({token,User:{_id,name,lastName,email,Role}})

  })



}
exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
  };

// for the protected route
// express middle ware for token verification.
/*exports.isSignedIn= expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth"
    
})

// for the authentication
// req.profile is come from the fronetend part.
exports.isAuthenticate=(req,res)=>{
    //console.log(req.profile._id)
   
    
    let result = req.profile&&req.auth&& req.profile._id==req.auth._id;

    if(!result){
        return res.status(403).json({message:"Acesss denied"})
    }
}
// for admin acesss

exports.isAdmin= (req,res)=>{
    if(req.body.role==0){
        return res.status(403).json({message:"You are not admin!"})
    }

  //custom middlewares
  exports.isAuthenticate = (req, res, next) => {
    /*let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();*/
    exports.isAuthenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        console.log(authHeader);

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                console.log("Fh"+token)
                return res.sendStatus(403).json({message:"error in authenticate"});
            }

            
            next();
            
          
        });
      
    } else {
        res.sendStatus(401);
    }

  };
  
  exports.isAdmin = (req, res, next) => {
    console.log("check")
    console.log(req.profile.Role)
    if (req.profile.Role == 0 || req.profile.Role==undefined) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
  };
