const express=require('express');
const app=express();
const fileUpload=require('express-fileupload');
app.use(express.json());
const intershipRouter=require('./routes/admin/eduventures/intershipRoutes')
const jobRouter=require("./routes/admin/eduventures/jobRouter");
const courseCategoryRouter=require('./routes/admin/eduventures/courseCategoryRoutes')
const trainerRouter=require('./routes/admin/eduventures/trainerRoute');
const courseRouter=require('./routes/admin/eduventures/courseRoutes');
const testimonialRouter=require('./routes/admin/eduventures/testimonialRoutes');
const trainingCategoryRouter=require('./routes/admin/consultants/trainingCategoryRoutes');
const trainingRouter=require('./routes/admin/consultants/trainingRoutes');
const hiringSolutionsCategoryRouter=require('./routes/admin/consultants/hiringSolutionsCategoryRoutes')
const hiringSolutionsRouter=require('./routes/admin/consultants/hiringSolutionsRoutes');
app.use(fileUpload({
    useTempFiles:true
}));
app.use("/api/admin/internships",intershipRouter);
app.use('/api/admin/jobs',jobRouter);
app.use('/api/admin/course-category',courseCategoryRouter);
app.use('/api/admin/trainers',trainerRouter);
app.use('/api/admin/courses',courseRouter);
app.use('/api/admin/testimonials',testimonialRouter);
app.use('/api/admin/training-category',trainingCategoryRouter);
app.use('/api/admin/trainings',trainingRouter);
app.use('/api/admin/hiringSolutions-category',hiringSolutionsCategoryRouter);
app.use('/api/admin/hiringSolutions',hiringSolutionsRouter);
app.get('/',(req,res)=>{
    res.send("API started!!");
});
module.exports=app;