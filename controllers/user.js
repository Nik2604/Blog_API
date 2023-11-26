import { User } from "../Models/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateCookie } from "../utils/feature.js";

export const userRegister = async(req,res)=>{
    
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if (user) return res.status(404).json({
        success:false,
        message:"User Already exist.."
    })
    const hashPassword = await bcrypt.hash(password,10)
    user=await User.create({
        name,
        email,
        password:hashPassword
    })

    generateCookie(user,res,201,"Successfully Registered!!!")
    
}

// export const userLogin=async(req,res)=>{
    
//     const {email,password}=req.body;
//     let user=await User.findOne({email});
//     if(!user) return res.status(400).json({
//         success:false,
//         message:"User does not exist!!!!"
//     })
//     const isMatch= await bcrypt.compare(password,user.password)
//     if(!isMatch)return res.status(400).json({
//         success:false,
//         message:"Invalid credential"
//     })

//     const token=jwt.sign({_id:user._id},'!@#$%^&*()')
//     res.status(201).cookie("token",token,{
//         httpOnly:true,
//         maxAge: 10*60*1000
//     }).json({
//         success:true,
//         message:`Welcome!!! ${user.name}`
//     })
// }

export const userLogin = async (req,res)=>{
    const {email,password} = req.body  
    let user = await User.findOne({email});
    if(!user) return res.status(400).json({
        success:false,
        messge:"User Not exist"
    })
    const isMatch = await bcrypt.compare(password,user.password)  
    if(!isMatch)return res.status(400).json({
        success:false,
        message:"Invalid credential"
    })
    generateCookie(user,res,201,`Welcome ${user.name}`)
}


export const logout= (req, res) => {
    res.status(200).cookie("token","",{
        expires:new Date(Date.now())
    }).json({success:true, message:"Logout Successfully"})
}

export const getMyProfile=(req, res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}