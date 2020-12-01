const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
const Joi = require("@hapi/joi");
const { string } = require("@hapi/joi");

//for registration
var userSchema=mongoose.Schema({
   "Name":String,
   "Email":String,
   "Password":String,
    "role":{
       type:String,
       default: "user",
   },
});
userSchema.methods.generateHashedPassword = async function(){
      let salt=await bcrypt.genSalt(10);
      this.Password=await bcrypt.hash(this.Password,salt);
};
var myUserSchema=mongoose.model("User",userSchema);

function validateLogRegistration(data) {
    const schema=Joi.object({
        Name:Joi.string().min(3).required(),
        Email:Joi.string().email().required(),
        Password:Joi.string().required(),
        role:{
            type:Joi.string(),
        }
        
    })
    return schema.validate(data,{abortEarly:false});
}

function validateLogIn(data) {
    const schema=Joi.object({
        Email:Joi.string().email().required(),
        Password:Joi.string().required()
        
    })
    return schema.validate(data,{abortEarly:false});
}



module.exports.myUserSchema=myUserSchema;
module.exports.validateLogRegistration=validateLogRegistration;
module.exports.validateLogIn=validateLogIn;
