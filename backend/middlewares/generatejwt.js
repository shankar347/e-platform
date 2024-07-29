import jwt from 'jsonwebtoken'

const generatejwt=(userid,res)=>{
 
        const token=jwt.sign({userid}
            ,process.env.JWT_KEY ||  '1QRRW1SFAFAFAQ',
        {expiresIn:'2d'})

    
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:2*24*60*60*1000,
        sameSite:'strict'
    })

    return token

}

export default generatejwt