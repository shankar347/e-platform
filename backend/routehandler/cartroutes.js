import cartmodel from "../model/cartschema.js"
import productmodel from "../model/productschema.js"

const createcart=async(req,res)=>{
  const {productid,quantity,color} =req.body
  const userid=req.user._id
  try
  {
   const product= await productmodel.findById(productid) 
   
   if(!product)
   {
    return res.json({error: "Product Not found"})
   }
   
   let cart =await cartmodel.findOne({user:userid})
    
   if (!cart)
   {0
    cart=new cartmodel ({user:userid,products:[]})
   }

   let productindex=cart.products.findIndex((cartitem)=>(
    cartitem.product.toString() === product._id.toString() 
   ))

   if(productindex !== -1)
   {
    cart.products[productindex].quantity+=quantity
   }
   else
   {
    cart.products.push({
        product:product._id,
        quantity:quantity,
        color:color
    })
   }

   

   await cart.save()
   
   res.json(cart)
  }
  catch(err)
  {
    console.log(err)
  }
}

const updatequantity=async(req,res)=>{
  try{
    const {quantity,productid} =req.body
    const userid=req.user._id

    let cart=await cartmodel.findOne({user:userid})

    if (!cart)
    {
      return res.json({error:'Error in updating quantity'})
    }
    
    let productindex=cart.products.findIndex((cartitem)=>
     cartitem.product.toString() === productid.toString()
    )
    
    if(productindex !== -1)
    {
      cart.products[productindex].quantity=quantity
    }
    else{
      return res.json({error:'Error in updating quantity'})
    }
    
    await cart.save()
    
    res.json(cart)
  }

  catch(err)
  {
    console.log(err)
  }
}

const removefromcart=async(req,res)=>{
    try
    {
      const {productid} = req.body
      const userid=req.user._id

      const cart = await cartmodel.findOne({user:userid})

      if(!cart)
      {
        return res.json({error:'Cart is not found'})
      }
      let productindex=cart.products.findIndex(
        (cartitem)=>(
            cartitem.product.toString() === productid.toString() 
        )
      )
      if(productindex === -1)
      {
        return res.json({error:'Product is not found in cart'})
      }
      cart.products.splice(productindex,1)
      
      await cart.save()
     
       res.json(cart)
    }
    catch(err)
    {
      console.log(err)
    }
}

const getusercart=async(req,res)=>{
   try
   {
     const userid=req.user._id
     console.log('Userid',userid)
     const cart=await cartmodel.findOne({user:userid})

     if(!cart)
     {
        return res.json([])
     }
     res.status(200).json(cart)
   }
   catch(err)
    {
      console.log(err)
    }
}

  const getcart=async(req,res)=>{
    try{

      const {id}=req.params;
      const cart = await cartmodel.findOne({user:req.user._id})
      
      if(!cart)
        {
           res.json([])
        }  
    
      const findindex=cart.products.findIndex((product)=>(
        product._id.toString() === id.toString()
      ))  
    
      // console.log('hi')
  
      if(findindex === -1)
      {
        return res.json({error: 'Cart item not found'})
      }
  
      let cartitem=cart.products[findindex]
      
      res.json(cartitem)
      
    }
    catch(err)
    {
      console.log(err)
    }
  }

const deleteallcart=async(req,res)=>{
    try{
      const userid=req.user._id

      const cart=await cartmodel.findOne({user:userid})

      if(!cart)
      {
        return res.json({error:'Cart not found'})
      }
      cart.products=[]
       await cart.save()
    
      res.json(cart) 
    }
    catch(err)
    {
      console.log(err)
    }
}


export {
    createcart,
    getusercart,
    deleteallcart,
    removefromcart,
    updatequantity,
    getcart
}