const trainerModel=require('../../../models/trainerModel');
const cloudinary=require('../../../configs/cloudinary');
const mongoose=require('mongoose');
const getTrainers=async(req,res)=>{
    try {
        const trainers=await trainerModel.find();
        if(trainers.length===0){
            return res.json({message:"No trainers found!"});
        }
        return res.json(trainers);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
const createTrainer=async(req,res)=>{
    try {
    const image = req.files.trainerImage;
    const result = await cloudinary.uploader.upload(image.tempFilePath);
    console.log("Uploaded Image:", result.url);
    const {name,description, linkedIn, github, twitter}=req.body;
    console.log(name," " , description,linkedIn,github,twitter);
    const createdTrainer=await trainerModel.create(
       { name,
        description,
        socialLinks:{
            linkedIn,
            github,
            twitter
        },
        trainerImage:result.url
    }
    )
        
     return res.json(createdTrainer);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
const deleteTrainer=async(req,res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
             return res.status(400).json({message:"Invalid ID format"});
        }
        const deletedTrainer=await trainerModel.findByIdAndDelete(req.params.id);
        if(!deleteTrainer){
            return res.status(404).json({message:"Trainer not found!"});
        }
        return res.json({message:"Trainer deleted sucessfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
const updateTrainer=async(req,res)=>{
try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
             return res.status(400).json({message:"Invalid ID format"});
        }
    const updatedTrainer=await trainerModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
        if(!updatedTrainer){
            return res.status(404).json({message:"Trainer not found!"});
        }
        return res.json({message:"Trainer updated sucessfully"});
    
} catch (error) {
    return res.status(500).json({message:error.message});
}
};
module.exports={getTrainers,createTrainer,deleteTrainer,updateTrainer};