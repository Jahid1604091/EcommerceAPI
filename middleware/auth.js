
import jwt from 'jsonwebtoken';

export const auth = async(req,res,next)=>{
    
    const token = req.headers['authorization']
    if(!token){
        res.status(400).json({success:false,message:"Token Not Found"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decoded //_id
       
    } catch (error) {
        res.status(400).json({success:false,message:error.message})

    }

    next()
  
}