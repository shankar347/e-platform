import jwt from 'jsonwebtoken'

const generatejwt=(userid,res)=>{
 
    const token=jwt.sign({userid},process.env.JWT_KEY,
        {expiresIn:'15d'})

    
    res.cookie('token',token,{
        maxAge:15*24*60*60*1000
    })

    return token

}

export default generatejwt