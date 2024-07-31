import React, { useContext, useEffect, useState } from 'react'
import Adminorderinfo from './adminorderinfo'
import { Spinner } from '@chakra-ui/react'
import { prouductcontext } from '../proudctpage/productcontext'

const Adminorderpage = () => {

   
    // console.log(orders)
    const [loading,setloading]=useState(false)
   const {adminorders:orders,setadminorders:setorders} =useContext(prouductcontext)
   useEffect(()=>{
    const fetchproduct=async()=>{
     try{
      setloading(true)
      const res=await fetch('/api/order')
      const data=await res.json()
      setorders(data)   
    }  
     catch(err)
     {
        console.log(err)
     } 
     finally{
        setloading(false)
     }
    }
    fetchproduct()
   },[])

  return (
   <>
   {
    loading && <div 
    className='w-full flex mt-5  justify-center items-center '>
       <Spinner/>
    </div> }
    {! loading && orders?.length ===0  ? 
        <div className='flex flex-col 
        text-lg font-medium items-center mt-40 justify-center'>
          No orders yet
        </div>  : 
     <div style={{userSelect:'none'}} 
     className={`flex md:flex-row lg:flex-row sm:flex-row 
        md:mx-10 lg:mx-10
       lg:gap-7 sm:gap-7 md:gap-7 gap-2
          flex-wrap flex-col md:mt-8 lg:mt-8 
          px-2  mt-2`}>
 
         {orders?.map((order)=>(
            <Adminorderinfo order={order} 
            key={order._id}/>           
         ))}
       
     </div>
   }
   </>
  )
}

export default Adminorderpage