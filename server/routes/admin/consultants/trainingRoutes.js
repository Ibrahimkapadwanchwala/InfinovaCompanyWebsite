const express=require('express');
const router=express.Router();
const{getTrainings,addTraining,updateTraining,deleteTraining}=require('../../../controllers/admin/consultants/trainingController');
router.get('/',getTrainings);
app.post('/new',addTraining);
app.put('/update/:id',updateTraining);
app.delete('/delete/:id',deleteTraining);
module.exports=router;
