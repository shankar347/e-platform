import ordermodel from "../model/orderschema.js"
import productmodel from "../model/productschema.js"


const createorder=async(req,res)=>{
   try{
     const {products,totalamount} =req.body
     
      for (let param of products)
      {
        const product=await productmodel.findById(param.product)
        if(!product)
        {
          return res.json({error:"Product is not found"})
        }
      }
      const order=new ordermodel({
        orderitems:products,
        totalprice:totalamount,
        userid:req.user._id
        })
       
      await  order.save()
     
      // res.json(products)
      // console.log(products)
      // console.log(totalamount)
      
      res.json(order)
    }
   catch(err)
   {
    console.log(err)
   }
}


const getorder=async(req,res)=>{
  
  try{
   const orders=await ordermodel.find({userid:req.params.id})
   .populate("orderitems.product")
   
   if(!orders || orders.length===0)
   {  
    res.json([])
   }
   res.json(orders)

  }
  catch(err)
  {
    console.log(err)
  }
}

const getallorders=async(req,res)=>{
  try{
    const orders=await ordermodel.find().sort(
      {createdAt:-1})
    .populate('orderitems.product')

    if(!orders)
    {
      res.json([])
    }
    
    res.json(orders)

  }
  catch(err)
  {
    console.log(err)
  }
}

const updateorder=async(req,res)=>{
     try{
    const {status} =req.body

    const order=await ordermodel.findByIdAndUpdate(req.params.id,
      {status},
      {new:true}
    )

    if (!order)
    {
      return res.json({error:"Order is not found"})
    }
     res.json(order)
     } 
     catch(err)
     {
      console.log(err)
     }
}

export{
    createorder,
    updateorder,
    getallorders,
    getorder
}