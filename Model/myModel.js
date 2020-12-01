const mongoose=require("mongoose");
const Joi = require("@hapi/joi");

var schema=mongoose.Schema({
    "Email": String,
    "Time": String,
    "Blood_Sugar_Level": Number,
    "Amount_of_Carbohydrate":Number,
    "Food_Diary":String,
    "Medicine":{
        "Type":String, 
        "Dose":String
    },
    "Exercise":{
        "Type":String,
        "Duration": String
    },
    "Unusual_Events":String
});

var myModel=mongoose.model("product",schema);

function validateLog(data) {
    const schema=Joi.object({
        Time: Joi.string().min(3).max(10).required(),
        Blood_Sugar_Level:Joi.number().min(0).required(),
        Amount_of_Carbohydrate:Joi.number().min(0).required(),
        Food_Diary:Joi.string().max(250).required(),
        Medicine:{
            Type:Joi.string().required(),
            Dose:Joi.string().required()
        },
        Exercise:{
            Type: Joi.string().required(),
            Duration:Joi.string().required()
        },
        Unusual_Events:Joi.string()
        
    })
    return schema.validate(data,{abortEarly:false});
}



module.exports.myModel=myModel;
module.exports.validate=validateLog;
