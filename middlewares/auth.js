export const isAuthenticated =async(req,res,next)=>{
    const {token}=req.cookies
    if(!token) return res.status(404).json(
        {success:false,
         message:"Please login"
        })
    const decode=jwt.verify(token,'!@#$%^&*()')
    req.user =await User.findById(decode._id)
    next()


}