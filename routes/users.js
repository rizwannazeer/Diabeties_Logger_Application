var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt=require("jsonwebtoken");
var config=require("config");
var router = express.Router();
var {userValidateLog,userValidateforLogIn}=require("../middleWares/usersValidation")


let {myUserSchema}=require("../Model/userModel")


router.post('/register',userValidateLog,async function(req, res, next) {
      let user=await myUserSchema.findOne({Email:req.body.Email})
      if(user) return res.status(400).send("This Email Already Exist!");
      user=new myUserSchema();
      user.Name=req.body.Name;
      user.Email=req.body.Email;
      user.Password=req.body.Password;
      await user.generateHashedPassword();
      await user.save();
      let token=jwt.sign({_id:user.id,Name:user.Name,role:user.role},config.get("jwtPrivateKey"));
      let datatoreturn={
          Name:user.Name,
          Email:user.Email,
          token:user.token
      }
      return res.send(datatoreturn);

});


router.post("/login",userValidateforLogIn, async (req,res)=>{
  let user=await myUserSchema.findOne({Email:req.body.Email})
  if(!user) return res.status(400).send("User not Exist!");

  let isvalid=await bcrypt.compare(req.body.Password,user.Password);
  if(!isvalid) return res.status(401).send("password is invalid");
  let token=jwt.sign({_id:user.id,Name:user.Name,role:user.role},config.get("jwtPrivateKey"));
  return res.send(token);
})

module.exports = router;
