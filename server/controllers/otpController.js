const otpModel=require('../models/otpModel');
const nodemailer=require('nodemailer')
const getOtp=async(req,res)=>{
    try {
        const{name,email,phone,age}=req.body;
        if(!email){
            return res.status(400).json("Email is required");
        }
        const otp=Math.floor(1000+Math.random()*9000);
        
        const existingRecord=await otpModel.findOne({email});
        if(!existingRecord){
            await otpModel.create({
        name,email,otp
       })
        }
        else{
            await existingRecord.updateOne({otp,createdAt:new Date()})
        }
       
       const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"ikapadwanchwala@gmail.com",
            pass:"kjulpyzbqqcplsie"
        }
       });
     transporter.sendMail({
        from:"ikapadwanchwala@gmail.com",
        to:"kapadwanchwalai@gmail.com",
        subject:"Your Otp",
        text:`Hi ${name}, your OTP code is ${otp}. It will expire in 5 minutes.`

     })
        res.json({success:true,message:"Otp sent successfully!!"})
    } catch (error) {
        res.status(500).json( {message: "Internal Server Error", error: error.message})
    }
}
const verifyOtp=async(req,res)=>{
    try {
        const{email,name,number,age,enteredOtp}=req.body;
        console.log(email);
        
        console.log(enteredOtp)
        const record=await otpModel.findOne({email});
        console.log(record);
        
        if(!record){
            return res.json({success:false,message:"Otp not found or expired!"})
        }
        if(enteredOtp==record.otp){
           
              return res.json({success:true,message:"Otp verified successfully"});
        }else{
            return res.json({ success: false, message: "Invalid OTP" });
        }
      
    } catch (error) {
        return res.status(500).json({success:false,message:"server error"});
    }
}
module.exports={getOtp,verifyOtp};