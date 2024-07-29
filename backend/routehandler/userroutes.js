import bcrypt from 'bcryptjs'
import usermodel from "../model/userschema.js";
import generatejwt from "../middlewares/generatejwt.js";


const userregister=async(req,res)=>{
    
    try
    {
      const {name,email,password,phoneno} = req.body;

      const usercheck=await usermodel.findOne({$or:[
        {email: email},
        {phoneno: phoneno}]})

      if(usercheck)
      {
        return res.json({error:"user already exist"})
      }
    
      const hash=bcrypt.genSaltSync(10)
      const hashedpassword=bcrypt.hashSync(password,hash)

       const user=new usermodel({
        name,
        email,
        password:hashedpassword,
        phoneno
       })

       await user.save()
       
       if(user)
          {
            generatejwt(user._id,res)
             res.json(user)
          } 

        else
        {
            res.json({error:'User registeration failed'})
        }

    }
    catch(err)
    {
        console.log(err.message)
        res.json(err.message)
    }
    

}

const userlogin=async(req,res)=>{
     try
     {
       const {email,password}=req.body
       
       const checkemail=await  usermodel.findOne({email})

       if(!checkemail)
       {
        return res.json({error:"user not exist"})
       }
       
       const checkpassword=bcrypt.compareSync(password,checkemail.password)
       
       if(!checkpassword)
       {
        return res.json({error:'Password incorrect'})
       }

       generatejwt(checkemail._id,res)
      
       res.json(checkemail)

     }
     catch(err)
     {
      console.log(err)
     }
}

const updateuser=async(req,res)=>{

  try
  {
    const {email,password,name,phoneno,housenumber,
      streetname,area,pincode,nearestplace}=req.body
     
     const {id} =req.params
     
     const user=await usermodel.findById(id)

     if(!user)
     {
      return res.json({error:"user not exist"})
     }
     
    //  const hash=bcrypt.genSaltSync(10)
    //  const hashedpassword=bcrypt.hashSync(password,hash)

     

     var newdetils={}
  if(email)    newdetils.email = email || user.email
  if(password)   {
    const hash1=bcrypt.genSaltSync(11)
    const hashedpassword1=bcrypt.hashSync(password,hash1) 
    newdetils.password =hashedpassword1 || user.password
  }
  if (name)   newdetils.name = name || user.name
  if (phoneno)    newdetils.phoneno = phoneno || user.phoneno

  var address={}

  if (housenumber)    address.housenumber = housenumber || user.housenumber
  if (streetname)    address.streetname = streetname || user.streetname
  if (area)    address.area = area || user.area
  if (pincode)    address.pincode = pincode || user.pincode
  if (nearestplace)    address.nearestplace = nearestplace || user.nearestplace
  
  newdetils.address=address

     const newuserdetails=await 
     usermodel.findByIdAndUpdate(id,newdetils,{new:true})
     
     res.json(newuserdetails)
     
  }
  catch(err)
  {
    console.log(err)
  }

}

const getuser=async(req,res)=>{
  try{
    const {id}=req.params

    
    const user=await usermodel.findById(id)
    
    if(!user)
    {
     return res.json({error:"User not found"})
    }
    res.json(user)
  }
  catch(err)
  {
    console.log(err)
  }
}

const logoutuser=(req,res)=>{

  try{
    
    res.clearCookie("token")
    res.json('Logged out user')
  }
  catch(err)
  {
    console.log(err)
  }
}

const deletaccount=async(req,res)=>{
  try{
    const userid=req.user._id
    const user=await usermodel.findById(userid)
    
    if(!user)
    {
      return res.json({error:"User not found"})
    }
    const userdelete=await usermodel.findByIdAndDelete(user._id)
    res.json("Account deleted")
   }
  catch(err)
  {
    console.log(err)
  }
}

export {
    userlogin,
    userregister,
    updateuser,
    logoutuser,
    deletaccount,
    getuser
}