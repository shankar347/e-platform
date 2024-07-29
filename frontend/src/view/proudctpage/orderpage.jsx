
import React, { useContext, useEffect, useState } from 'react'
import { prouductcontext } from './productcontext'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import Cartinfo from './cartinfo'
import Orderinfo from './orderinfo'
import { Spinner } from '@chakra-ui/react'

const Orderpage = () => {
    const {searchproduct,setsearchproduct}=useContext(prouductcontext)   
    const user=useRecoilValue(useratom)
    const [orders,setorders]=useState(null)
    // console.log(orders)
    const [loading,setloading]=useState(false)

    useEffect(()=>{
      const getorders=async()=>{
        try{
          setloading(true)
         const res=await fetch(`/api/order/${user._id}`)
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
      getorders()
    },[])


    return (
   <>
   {
    loading ? <div className='flex justify-center
    items-center w-full'>
  <Spinner/>
    </div> : 
     <div style={{userSelect:'none'}} 
     className={`flex flex-col ${searchproduct ? "opacity-50 " :"" }`}>
         <div className='flex  pl-2 pt-3 
          justify-between'>
         <div className='flex flex-col gap-1
         md:flex-row  sm:flex-row md:items-center 
         lg:items-center  sm:items-center lg:flex-row'>
         <div className='md:text-md
         lg:text-md   text-sm font-md'>
       Your orders
      </div>
     <div className='text-md font-medium'>
         {user?.name}
     </div>
     </div>
            
       </div>
       <div className='flex flex-col mt-5'>
    {
      orders?.map((eachorder)=>(
        eachorder?.orderitems.map((item)=>{
         return     <Orderinfo product={item}
         key={item._id} date={eachorder?.orderdate}
         status={eachorder?.status} />
        })
      ))
    }
       </div>
     </div>
   }
   </>
  )
}

export default Orderpage