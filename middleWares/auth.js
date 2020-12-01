let jwt=require("jsonwebtoken");
let config=require("config");
let {myUserSchema}=require("../Model/userModel")
const { func } = require("@hapi/joi");

async  function auth(req,res,next) {
    let token= req.header("x-auth-token") || req.header("authentication");
   
    
    try {
        if(!token) return res.status(400).send("please provide token");
        let user=jwt.verify(token,config.get("jwtPrivateKey"));
        req.user=await myUserSchema.findById(user._id);
    } catch (error) {
        res.status(401).send("invalid token");
    }
    next();
}

module.exports=auth;