let {validateLogRegistration,validateLogIn}=require("../Model/userModel");

function userValidateLog(req,res,next) {
    let {error}=validateLogRegistration(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next(); 
}


function userValidateforLogIn(req,res,next) {
    let {error}=validateLogIn(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next(); 
}

module.exports.userValidateLog=userValidateLog;
module.exports.userValidateforLogIn=userValidateforLogIn;
