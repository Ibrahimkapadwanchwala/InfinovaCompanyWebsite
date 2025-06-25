const mongoose=require('mongoose');
const internshipSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
         type:String,
        required:true
    },
    stipend:{
         type:String,
        required:true
    },
    duration:{
         type:String,
        required:true
    },
    experienceRequired:{
         type:String,
        required:true
    },
    isPublished:{
         type:Boolean,
         default:false
    }

},{timestamps:true});
module.exports=mongoose.model("Internship",internshipSchema);