import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import authatom from '../atom/loginatom'
import Timecompnent from '../hooks/timecompnent'
import { Spinner } from '@chakra-ui/react'

const Orderinfo = ({product,status,date}) => {

    const path=useLocation()
    const user1=useRecoilValue(useratom)
    const user=user1?.token
    const pathname=path.pathname === `/${user._id}/orders`
    const [product1,setproduct]=useState(null)
    const [loading,setloading]=useState(false)
    
    // console.log(product)
   
    useEffect(()=>{
     const getproduct=async()=>{
      try{
        setloading(true)
        const res=await fetch(`/api/cart/${product?._id}`)
        if (res.ok)
          {
            const data=await res.json()
            const product=await fetch(`/api/product/${data.product}`)
            const productdata=await product.json()
            setproduct(productdata)
          } 
         } 
        catch(err)
        { 
          console.log(err)
        }
        finally{
          setloading(false)
        }
     }
     getproduct()
    },[product?._id])

    const totalprice=product?.quantity * product1?.price


    return (
      <>
{
  loading ? <div className='flex justify-center
  items-center w-full h-40'>
    <Spinner/>
  </div> : 
       
       <div className='flex  pb-2 border-b-2
       border-gray-300 h-40 mx-2 gap-3
       lg:mx-4 md:mx-4 sm:mx-4 py-2'>
        <div className='md:w-36 lg:w-36 sm:w-36  
        w-32 h-full '>
        <img src={product1?.image} alt='' 
        className='w-[100%] h-full'/>
        </div>
        <div className='flex items-center justify-center flex-col ml-2 sm:ml-7 md:flex-row
        lg:flex-row '>
         <div className='flex flex-col my-auto sm:gap-16 items-center sm:flex-row md:flex-row  lg:flex-row'>
        <div className='flex flex-col md:flex-row lg:flex-row'>
         <div className='ml-0 md:ml-10 lg:ml-10
          md:w-52 lg:w-52 '>
           <p className='text-lg sm:mb-3  font-semibold'>
               {product1?.name}
           </p>
         </div>
         <div className='flex gap-2'>
           <div className=' lg:text-lg md:text-lg sm:text-lg text-md
            md:hidden lg:hidden 
           block  font-semibold'>
           Price
           </div>
         <div className='lg:text-lg md:text-lg 
         sm:text-lg text-md
          font-semibold 
         md:w-20  lg:w-20 sm:mb-3'>
           ₹{product1?.price}.00
         </div>
         </div> 
         <div className='flex gap-3 sm:mb-2'>
         <div className='lg:text-lg md:text-lg  sm:text-lg text-md
          md:w-20
         lg:w-20  md:ml-10 lg:ml-10
          font-semibold '> 
            {product?.quantity} Nos
         </div>
         <div  className='lg:text-lg md:text-lg sm:text-lg text-md
          md:w-20 lg:w-20  
         md:ml-10 lg:ml-10 ml-0
          font-semibold '>
          ₹{totalprice}
         </div>  
         </div>
         <div className='flex items-center
           gap-2'>
           <div className=' lg:text-lg md:text-lg 
           sm:text-lg text-md
            md:hidden lg:hidden 
           block  font-semibold'>
           Orderd at
           </div>
         <div className='lg:text-lg md:text-lg 
         sm:text-lg text-md
          font-semibold 
         md:w-30 mt-[3px]  lg:w-30 sm:mb-3'>
          <Timecompnent date={date} />
         </div>
         </div> 
         </div>
       <div>
   
           <div className={`lg:text-lg md:text-lg 
           sm:text-lg text-md 
          md:w-20 lg:w-20  
         md:ml-10 lg:ml-10 ml-0  
          font-semibold mt-2  md:mb-2 lg:mb-2 sm:mb-2
           md:mt-0 lg:mt-0 sm:mt-0 
           ${status === "Delivered" ? "text-green-400" : status === "Cancelled" ?
             "text-red-400" : status === "Pending" ? "text-yellow-400"
             : "text-blue-400"
            } `}>
             {status}
           </div>
       </div>
       
        </div>
         </div>
       </div>
}
    </>
  )
}

export default Orderinfo