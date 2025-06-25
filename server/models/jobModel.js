const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ctc:{
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
module.exports=mongoose.model("Job",jobSchema)