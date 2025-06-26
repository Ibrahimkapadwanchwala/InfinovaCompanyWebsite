const express=require('express');
const router=express.Router();
const{deleteCategories,addCategory,updateCategory,getCategories}=require('../../../controllers/admin/eduventures/courseCategoryController');
router.get('/',getCategories);
router.post('/',addCategory);
router.delete('/:id',deleteCategories);
router.put('/:id',updateCategory);
module.exports=router;