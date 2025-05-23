const asyncHandler = require("express-async-handler");
const User=require('../models/userModel');
const Complaint=require('../models/complainModel');
const Comment=require('../models/commentModel');

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find().select('-password');
    if(!users){
        res.status(404);
        throw new Error("Users not found");
    }
    res.status(200).json(users);
})

const getComplaints=asyncHandler(async(req,res)=>{
    const complaints=await Complaint.find();
    if(!complaints){
        res.status(404);
        throw new Error("Complaints not found");
    }
    res.status(200).json(complaints);
})

const updateComplaint=asyncHandler(async(req,res)=>{
    const updatedComplaint=await Complaint.findByIdAndUpdate(req.params.cid,req.body,{new:true});
    if(!updatedComplaint){
        res.status(401);
        throw new Error("Complaint Not Updated");
    }
    res.status(200).json(updatedComplaint);
})

const getComments=asyncHandler(async(req,res)=>{
    const comments=await Comment.find();
    if(!comments){
        res.status(404);
        throw new Error("Comments not found");
    }
    res.status(200).json(comments);
})

const addComment=asyncHandler(async(req,res)=>{
    const{message}=req.body;
    if(!message){
        res.status(400);
        throw new Error("Please Fill All Details");
    }

    const comment=await Comment.create({user:req.user._id,complaint:req.params.cid,message:message,isAdmin:true});
    if(!comment){
        res.status(400);
        throw new Error("Comment not created");
    }
    res.status(201).json(comment);
})

module.exports={getUsers,getComplaints,updateComplaint,getComments,addComment};