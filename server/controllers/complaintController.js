const asyncHandler=require('express-async-handler')
const Complaint=require('../models/complainModel');
const User=require('../models/userModel');






// get all complaints
const getComplaints=asyncHandler(async(req,res)=>{

    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }

    const complaints=await Complaint.find({user:user._id});

    if(!complaints){
        res.status(404);
        throw new Error( "No Complaints Found");
    }
    res.status(200).json(complaints)
})



// get single Complaints
const getComplaint=asyncHandler(async(req,res)=>{
    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }

    const complaint=await Complaint.findById(req.params.id);

    if(!complaint){
        res.status(404);
        throw new Error("No Complaints Found")
    }
    res.status(200).json(complaint)
})



// raise complaint
const raiseComplaint=asyncHandler(async(req,res)=>{
    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }


    const{laptop,description,image}=req.body;

    if(!laptop||!description||!image){
        res.status(400);
        throw new Error("Please Fill All Details and Upload image");
    }
    
    const complaint=await Complaint.create({user:user._id,laptop,description,image});
    
    if(!complaint){
        res.status(400);
        throw new Error("Complaint not Raised")
    }
    res.status(201).json(complaint);
})



//update complaint
const updateComplaint=asyncHandler(async(req,res)=>{
    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }

    const updatedComplaint=await Complaint.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!updatedComplaint){
        res.status(400);
        throw new Error("Complaint not Updated")
    }
    res.status(200).json(updatedComplaint);

})

module.exports={getComplaint,getComplaints,updateComplaint,raiseComplaint}