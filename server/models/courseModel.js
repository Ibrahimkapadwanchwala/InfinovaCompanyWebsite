const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true
    },
    duration:{
        type:String,
    },
    brochure:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courseCategory',
       
    },
    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"trainer",
        required:true   
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports=mongoose.model("Course",courseSchema);