const express=require('express');
const router=express.Router();
const{getTrainers,createTrainer,updateTrainer,deleteTrainer}=require('../../../controllers/admin/eduventures/trainerController');

router.get('/',getTrainers);
router.post('/',createTrainer);
router.put('/:id',updateTrainer);
router.delete('/:id',deleteTrainer);
module.exports=router;