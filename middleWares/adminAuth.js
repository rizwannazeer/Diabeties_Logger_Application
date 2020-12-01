

function admin(req,res,next) {
    if(req.user.role!= "admin") return res.status(403).send("you are not authorized!");
    next();
}

module.exports=admin;