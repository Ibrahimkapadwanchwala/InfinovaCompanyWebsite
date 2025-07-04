const serviceModel=require('../../../models/serviceModel');
const mongoose=require('mongoose');
const cloudinary=require('../../../configs/cloudinary')
const path=require('path');
const getServices=async(req,res)=>{
    try {
        const services=await serviceModel.find({});
        if(services.length===0){
            return res.status(404).json({message:"No services found"});
        }
        return res.json(services);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
const addService=async(res,res)=>{
    try {
        const{name,details,cost}=req.body;
        const brochureFile=req.files.brochure;
        const allowedExtensions = ['.pdf', '.docx'];
    const ext = path.extname(brochureFile.name).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
          return res.status(400).json({ message: "Unsupported brochure format." });
        }
        const result = await cloudinary.uploader.upload(brochureFile.tempFilePath);
        const brochureUrl=result.secure_url;
        const brochurePublicId=result.public_id;
        const newService=await serviceModel.create({
            name,
            details,
            cost,
            brochureUrl,
            brochurePublicId
        });
        return res.status(201).json({message:"Service added sucessfully!!",data:newService});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }

};
const deleteService=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid ID format"});
        }
        const service=await serviceModel.findById(id);
        if(!service){
            return res.status(404).json({message:"Service not found!"});
        }
        if(service.brochurePublicId){
            await cloudinary.uploader.destroy(service.brochurePublicId);

        }
        await serviceModel.findByIdAndDelete(id);
        return res.status(201).json({message:"Servive deleted sucessfully!!"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};