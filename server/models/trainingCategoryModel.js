const mongoose=require('mongoose');
const traningCategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true});
module.exports=mongoose.model("TrainingCategory",traningCategorySchema);