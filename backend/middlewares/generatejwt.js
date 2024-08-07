import jwt from 'jsonwebtoken'

const generatejwt=(userid,res)=>{
      try{
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
       catch(err)
       {
        console.log('User sesson error',err)
        res.json('User sesson err',err)
       }

}

export default generatejwt