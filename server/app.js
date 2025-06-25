const express=require('express');
const app=express();
app.use(express.json());
const intershipRouter=require('./routes/admin/eduventures/intershipRoutes')
const jobRouter=require("./routes/admin/eduventures/jobRouter");
app.use("/api/admin/internships",intershipRouter);
app.use('/api/admin/jobs',jobRouter);
app.get('/',(req,res)=>{
    res.send("API started!!");
});
module.exports=app;