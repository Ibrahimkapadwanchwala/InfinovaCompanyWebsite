const jobModel=require('../../../models/jobModel');
const createJob=async(req,res)=>{
try {
        const createdJob=await jobModel.create(req.body);
        res.status(201).json(createdJob);
} catch (error) {
    res.status(500).json({message:error.message});
}
};
const getJob=async(req,res)=>{
    try {
        const data=await jobModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const updateJob=async(req,res)=>{
    try{
        const updatedJob=await jobModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updated);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const deleteJob=async(req,res)=>{
try {
    const deletedJob=await jobModel.findOneAndDelete(req.params.id);
      res.json({message:"Internship deleted sucessfully"});
} catch (error) {
    res.status(500).json({message:error.message});
}
};
module.exports={
createJob,
getJob,
updateJob,
deleteJob
};