const asyncHandler = require("express-async-handler");
const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");



const register=asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please Fill All Details!!");   
    }
    // Check if user already exist
    const userExist=await User.findOne({email:email})
    if(userExist){
        res.status(400);
        throw new Error("User Already Exist");
    }
    
    // Hash password
    const salt=bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(password,salt);

    // Create user
    const user=await User.create({name,email,password:hashedPassword});
    if(!user){
        res.status(400)
        throw new Error("User not created")
    }

    res.status(200).json({
        id:user._id,
        name:user.name,
        email:user.email,   
        token:generateToken(user._id)
    });

})

const login=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("Please Fill All Details!!");   
    }
    // Find  if user  exist
    const user=await User.findOne({email})
    if(user && bcrypt.compareSync(password,user.password)){
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    
  
})

// private route
const privateRoute=(req,res)=>{
    res.json({
        id:req.user.id,
        user:req.user.name,
        email:req.user.email,

    })
}

// creating a  function for generating token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.TKN_SECRET,{expiresIn:'30d'});
}

module.exports={register,login,privateRoute}


// 67af6c80d290c50cc2c26f36