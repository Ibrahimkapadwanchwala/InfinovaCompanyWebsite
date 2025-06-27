const express=require('express');
const app=express();
const fileUpload=require('express-fileupload');
app.use(express.json());
const intershipRouter=require('./routes/admin/eduventures/intershipRoutes')
const jobRouter=require("./routes/admin/eduventures/jobRouter");
const courseCategoryRouter=require('./routes/admin/eduventures/courseCategoryRoutes')
const trainerRouter=require('./routes/admin/eduventures/trainerRoute');
app.use(fileUpload({
    useTempFiles:true
}));
app.use("/api/admin/internships",intershipRouter);
app.use('/api/admin/jobs',jobRouter);
app.use('/api/admin/course-category',courseCategoryRouter);
app.use('/api/admin/trainer',trainerRouter);
app.get('/',(req,res)=>{
    res.send("API started!!");
});
module.exports=app;