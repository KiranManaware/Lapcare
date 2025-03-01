const asyncHandler = require("express-async-handler");
const User=require('../models/userModel');
const Complaint=require('../models/complainModel');
const Comment=require('../models/commentModel');

const getComments=asyncHandler(async(req,res)=>{
    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }

    const complaint=await Complaint.findById(req.params.id);
    if(!complaint){
        res.status(404);
        throw new Error("Complaint Not Found");
    }

    const comment=await Comment.find({complaint:complaint._id});
    if(!comment){
        res.status(404);
        throw new Error("Comments Not Found");
    }

    res.status(200).json(comment)
    res.send("All Comments Here...")
})
const addComment=asyncHandler(async(req,res)=>{

    const{text}=req.body;
    if(!text){
        res.status(400);
        throw new Error("Please fill all details...");
    }

    
    // Find if user exist or not
    const user= await User.findById(req.user._id);
    if(!user){
        res.status(401);
        throw new Error("Invalid Request")
    }

    const complaint=await Complaint.findById(req.params.id);
    if(!complaint){
        res.status(404);
        throw new Error("Complaint Not Found");
    }

    const comment=await Comment.create({user:user._id,complaint:complaint._id,message:text});
    if(!comment){
        res.status(401);
        throw new Error("Comments Not Added");
    }

    res.status(201).json(comment)
    res.send(" Comment Added...")
})

module.exports={getComments,addComment};
