import productmodel from "../model/productschema.js"
import usermodel from "../model/userschema.js"
import {v2 as cloudinary} from 'cloudinary'

const createproduct=async(req,res)=>{
    
    try{
     
        const {name,price,descreption,colors} = req.body
        let {imageurl}=req.body
        console.log(colors)
       
        if(imageurl)
     {
       var uplodurl= await cloudinary.uploader.upload(imageurl)
       imageurl=uplodurl.secure_url  
     }
        

        const product = new productmodel({
            name,
            price,
            image:imageurl,
            descreption,
            colors
        })

      await product.save()

    res.json(product)

        
    }

     catch(err)
     {
        console.log(err)
        res.json(err?.message)
     }
}

const getproduct=async(req,res)=>{
  
    const {id} =req.params;
  try{
  const product=await productmodel.findById(id)

  if(!product)
  {
    return res.json({error:'Product is not found'})
  }
  
  res.json(product)
}
catch(err)
{
   console.log(err)
}
}

const getallproduct=async(req,res)=>{
  
    try
    {
        const allproducts=await productmodel.find({}).sort({createdAt:1})
        
        if(!allproducts)
        {
            res.json([])
        }

        res.json(allproducts)
    }
    catch(err)
     {
        console.log(err)
     }

}


const gettopproducts=async(req,res)=>{
    try{
        const topproducts=await productmodel.aggregate([
            {
                $addFields:{
                    likesCount:{ $size: "$likes"}
                }
            },
            {
                $sort:{
                    likesCount:-1
                }
            },
            {
                $limit:4
            }
        ]).limit(4)
        
        if(!topproducts)
       {
        res.json([])
       }
        res.json(topproducts)
    }
    catch(err)
    {
        console.log(err)
    }
}

const getnewproducts=async(req,res)=>{
  try
  {
    const products=await productmodel.find()
    .sort({createdAt:-1}).limit(4)

    if(!products)
    {
        res.json([])
    }

    res.json(products)
  }
  catch(err)
  {
    console.log(err)
  }
}

const getrandomproduct=async(req,res)=>{
  
    try{
    
        const randomovies=await productmodel.aggregate(
        [{$sample:{size:4}}]
    ).limit(4)

    if(!randomovies)
    {
        res.json([])
    }
    res.json(randomovies)
    }
    catch(err)
     {
        console.log(err)
     }

}



const updateproduct=async(req,res)=>{
   
    const {name,price,image,descreption,stock}=req.body;

    try
    {
     const product=await productmodel.findById(req.params._id)

      if(!product)
      {
        return res.json({error:'Product not found'})
      } 
     
      const updatedetails={ }
   
      if(name) updatedetails.name= name || product.name
      if(price) updatedetails.price = price || product.price
      if(image)  updatedetails.image =image || product.image 
      if(descreption) updatedetails.descreption || product.descreption
      if(stock)  updatedetails.stock || product.stock

      const newproduct=await productmodel.findByIdAndUpdate(req.params._id,
        updatedetails,
        {new:true}
      )
       
      res.json(newproduct)

    }
    catch(err)
    {
       console.log(err)
    }
    
}

const deleteproduct=async(req,res)=>{
   const {id} =req.params

   try{
    const product=await productmodel.findByIdAndDelete(id)
  
   res.json('Product Deleted successfully')
   }
   catch(err)
    {
       console.log(err)
    }
}

const createreview=async(req,res)=>{

    const {id}=req.params;
    const {comment}=req.body
   try{
    const product=await productmodel.findById(id)

    if(!product)
    {
        return res.json({error:"Product Not found"})
    }
    

    const checkreview=product.reviews.findIndex((review)=>(
        review.user.toString() ===  req?.user?._id.toString() 
    ))

    if(checkreview !== -1)
    {
        return res.json({error:'You are alread reviewed'})
    }  

    var usercomment={
        comment:comment,
        name:req?.user?.name,
        user:req?.user?._id
    }


    product.reviews.push(usercomment)
    product.save()

    res.json(product.reviews)
}



catch(err)
{
    console.log(err)
}
}


const getallreivews=async(req,res)=>{
   try{
      const {id} =req.params
      
      const product =await productmodel.findById(id)

      
      if(!product)
      {
        return res.json({error:'Product not found'})
      }
       
      const reviews= product.reviews

      if(!reviews)
      {
        res.json([])
      }

      res.json(reviews)
        
   } 
   catch(err)
   {
    console.log(err)
   }
}



const deletereview=async(req,res)=>{
    
    const {id} =req.params
    try{
    const product=await productmodel.findById(id)
   
    if(!product)
    {
        return res.json({error:'Product is not found'})
    }
   
    const checkreview=product.reviews.findIndex((review)=>(
        review.user.toString() ===  req?.user?._id.toString() 
    ))
   
    if (checkreview === -1)
    {
        return res.json({error:'You are not reviewed yet'})
    }
    
    product.reviews.splice(checkreview,1)

    await product.save()

    res.json(product.reviews)
}
catch(err)
{
    console.log(err)
}
}

const updatereview=async(req,res)=>{
    const {id} =req.params
    const {comment}=req.body

    try{
      const product=await productmodel.findById(id)

      if(!product)
      {
        return res.json({error:"Product not found"})
      }
      
      const checkreview=product.reviews.findIndex((review)=>(
        review.user.toString() ===  req?.user?._id.toString() 
    ))
   
    if (checkreview === -1)
    {
        return res.json({error:'You are not reviewed yet'})
    }
    
    const updatereply=product.reviews[checkreview]

    if (comment) updatereply.comment =comment 
    
    await product.save()

    res.json(product.rev)

    }
    catch(err)
{
    console.log(err)
}
}



const addtofavourites=async(req,res)=>{
    
    const {id} =req.params
    try
    {
     const product=await productmodel.findById(id)
     
     if(!product)
     {
        return res.json({error:'Product is not found'})
     }

     product.likes.push(req?.user?._id)
     
     product.save()
  
     res.json(product)

    }
    catch(err)
{
    console.log(err)
}
}

const createrating=async(req,res)=>{
  try
  {
   const {id} =req.params
   const {rating}=req.body

   const product=await productmodel.findById(id)
   
   if(!product)
   {
    return res.json({error:'Product is not found'})
   }

   product.rating = rating

   await product.save()
   
   res.json(product)

  }
  catch(err)
  {
    console.log(err)
  }
}

const getfavourites=async(req,res)=>{
   
    try{
      const user=await usermodel.findById(req.user._id)
      if(!user)
      {
        return res.json({error:"User is not found"})
      }

      const products=await productmodel.find({
        likes:user._id
      })

 
     
     res.json(products)
    }
    catch(err)
    {
        console.log(err)
    }
}

export {
    createproduct,
    createreview,
    getproduct,
    updateproduct,
    updatereview,
    deletereview,
    deleteproduct,
    gettopproducts,
    getrandomproduct,
    getallproduct,
    addtofavourites,
    createrating,
    getnewproducts,
    getallreivews,
    getfavourites
}