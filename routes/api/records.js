const express=require("express");
let middlewareForValidate=require("../../middleWares/validateLog");
let {myModel,validate}=require("../../Model/myModel");
let auth=require("../../middleWares/auth");
// let admin=require("../../middleWares/adminAuth");


let router=express.Router();




//get all data
router.get("/", auth, async (req,res)=>{
    console.log(req.user)
    let page=Number(req.query.page? req.query.page:1)
    let perPage=Number(req.query.perPage? req.query.perPage:10)
    let skipRecords=(perPage*(page-1));
    let logger=await myModel.find({ "Email": req.user.Email }).skip(skipRecords).limit(perPage);
    let total= await myModel.countDocuments();
    
    return res.send(logger);
});

// get single data

router.get("/:id", auth, async (req,res)=>{
   try {
    let logger=await myModel.findById(req.params.id);
    if(!logger){
        return res.send("This patient is not Exist").status(400);
    }
    return res.send(logger);
       
   } catch (error) {
       return res.status(400).send("your ID is Invalid");
   }
});

//Update Record

router.put("/:id",async (req,res)=>{
    let logger=await myModel.findById(req.params.id);
    logger.Time=req.body.Time;
    logger.Blood_Sugar_Level=req.body.Blood_Sugar_Level;
    logger.Amount_of_Carbohydrate=req.body.Amount_of_Carbohydrate;
    logger.Food_Diary=req.body.Food_Diary;

    logger.Medicine.Type=req.body.Medicine.Type;
    logger.Medicine.Dose=req.body.Medicine.Dose;

    logger.Exercise.Type=req.body.Exercise.Type;
    logger.Exercise.Duration=req.body.Exercise.Duration;

    logger.Unusual_Events=req.body.Unusual_Events;

    (await logger).save();
    return res.send(logger);
})

router.post("/", auth, async (req,res)=>{
    
    let logger=new myModel();
    logger.Time=req.body.Time;
    logger.Email = req.user.Email;
    logger.Blood_Sugar_Level=req.body.Blood_Sugar_Level;
    logger.Amount_of_Carbohydrate=req.body.Amount_of_Carbohydrate;
    logger.Food_Diary=req.body.Food_Diary;

    logger.Medicine.Type=req.body.Medicine.Type;
    logger.Medicine.Dose=req.body.Medicine.Dose;

    logger.Exercise.Type=req.body.Exercise.Type;
    logger.Exercise.Duration=req.body.Exercise.Duration;

    logger.Unusual_Events=req.body.Unusual_Events;

     await logger.save();
    return res.send(logger);
});


router.delete("/:id",async (req,res)=>{
    var logger=await myModel.findByIdAndDelete(req.params.id);
    return res.send(logger);
});

module.exports=router;