const mongoose=require('mongoose');
const trainerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    socialLinks:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
});
module.exports=mongoose.model("trainer",trainerSchema);