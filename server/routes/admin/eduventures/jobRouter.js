const express=require('express');
const router=express.Router();
const{getJob,createJob,updateJob,deleteJob}=require("../../../controllers/admin/eduventures/jobController");
router.get("/",getJob);
router.post("/",createJob);
router.put("/:id",updateJob);
router.delete("/:id",deleteJob);
module.exports=router;