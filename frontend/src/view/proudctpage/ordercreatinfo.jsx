import React, { useEffect, useState } from 'react'
import star from '../../assets/star.png'
import { Spinner } from '@chakra-ui/react'

const Ordercreateinfo = ({product}) => {
 
  
  const [product1,setproduct]=useState(null)
  const [cartitem,setcartitem]=useState(null)

  //  console.log(product1)
  
   var totalprice=cartitem?.quantity * product1?.price 

   const [loading,setloading]=useState(false)

   useEffect(()=>{
   const getcartiteminfo=async()=>{
    try{
        if(!product) return;
        setloading(true)
        const res=await fetch(`/api/cart/${product}`)
        const data=await res.json() 
        setcartitem(data)
    } 
    catch(err)
    {
        console.log(err)
    }
    finally
    {
      setloading(false)
    }
   }
  
   getcartiteminfo()
  },[product])
  


  useEffect(()=>{
  
    const getproductinfo=async()=>{
        try{
      
          if(!cartitem?.product) return
        setloading(true)
         const res=await fetch(`/api/product/${cartitem?.product}`)
         const data=await res.json()
         setproduct(data)
        }
        catch(err)
        {
           console.log(err)
        }
        finally
        {
          setloading(false)
        }
      }
      getproductinfo()

  },[cartitem?.product])

  return (
   <>
   {
    loading ?
    <div className='flex w-full h-[250px]
    items-center  justify-center'>
        <Spinner/>
    </div> : 
        <div 
        style={{userSelect:'none'}}
        className='flex flex-col border-b-2
        border-gray-300 mx-3 pb-2    gap-2    '>
            <div className='flex mt-5   
         md:gap-20 lg:gap-20 sm:gap-20  
          md:pl-6 lg:pl-6 pl-1 gap-2'>
         <div className='md:w-[250px] 
         lg:w-[250px] w-[200px]  h-[250px] '>
          <img src={product1?.image} alt='' 
          className="w-full h-full" 
          loading='lazy'/>
         </div>
         <div className='flex flex-col'>
            <div className='md:text-4xl
            lg:text-4xl sm:text-4xl text-xl font-semibold'>
             {product1?.name}
             </div> 
             <div className='flex gap-2 md:gap-5 
             lg:gap-5  sm:gap-5  mt-5'>
             <img src={star} alt=""  className={`w-4 h-4
            ${product1?.likes?.length >= 1 ?  "opacity-100" : "opacity-40" }`}/>
          <img src={star} alt="" className={`w-4 h-4
            ${product1?.likes?.length > 4 ?  "opacity-100" : "opacity-40" }`}/>
          <img src={star} alt="" className={`w-4 h-4
            ${product1?.likes?.length > 6 ?  "opacity-100" : "opacity-40" }`}/>
          <img src={star} alt="" className={`w-4 h-4 
            ${product1?.likes?.length > 8 ?  "opacity-100" : "opacity-40" }`}/>
          <img src={star} alt="" className={`w-4 h-4 
          ${product1?.likes?.length > 10 ?  "opacity-100" : "opacity-40" }
          `}/>  
             </div>
             <div className='flex flex-col md:flex-row
             lg:flex-row sm:flex-row   gap-1 md:gap-5
             lg:gap-5 sm:gap-5 pt-6'>
            <div className='md:text-lg lg:text-lg text-md'>
             Price
            </div>
            <div className='text-red-500 text-lg'>
            ₹{product1?.price}.00
            </div>
          </div>
         <div className='flex flex-col 
           '>
         <div className='flex gap-2 pt-4'>
            <div className='md:text-lg lg:text-lg text-md'>
              Quantity
            </div>
            <div className='text-gray-700  
            text-lg font-medium'>
            {cartitem?.quantity} Nos    
            </div>
          </div>
          <div className='flex gap-2 pt-4'>
            <div className='md:text-lg lg:text-lg text-md'>
              Total price
            </div>
            <div className='text-gray-700 
            text-lg text-red-400'>
            ₹{totalprice}   
            </div>
          </div>
         </div>
         </div>
        </div>
         <div>    
         </div>
         <div className='font-medium md:pl-10 
        lg:pl-10 sm:pl-10 pl-3
        mt-1 text-lg '>
         Descreption    
        </div>  
             <div className='text-md  md:pl-10 
        lg:pl-10 sm:pl-10 pl-3'>
              {product1?.descreption}
             </div>    
        </div>
   }
   </>
  )
}   

export default Ordercreateinfo