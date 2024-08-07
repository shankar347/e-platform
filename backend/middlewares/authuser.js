import jwt from 'jsonwebtoken'
import usermodel from '../model/userschema.js';

const Authuser=async(req,res,next)=>{

    
    const token=req?.cookies?.token;
    try{
    
        if(!token)
    {
        return res.json('User is Unauthorized')
        
    }
    
     const decoded=jwt.verify(token,process.env.JWT_KEY || '1QRRW1SFAFAFAQ')
    console.log(decoded)
    const user=await usermodel.findById(decoded.userid)
    
    req.user=user
    
    
    next()
    
}

    catch(err)
    {
        console.log({error:'Error in authentication',error:err.message})
        res.json(err.message)
    }
    

}

export default Authuser