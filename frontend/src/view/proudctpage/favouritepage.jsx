import React, { useContext, useEffect, useState } from 'react'
import Orderinfo from './orderinfo'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { prouductcontext } from './productcontext'
import Productcart from './productcart'
import { Spinner } from '@chakra-ui/react'

const Favourtepage = () => {
    const user=useRecoilValue(useratom)
   
    const {searchproduct,setsearchproduct,
      favourite,setfavoutie
    }=useContext(prouductcontext)  
  
  const [loading,setLoading]=useState(false)


   console.log(favourite)
    useEffect(()=>{
      const getfavourites=async()=>{
        try{
          setLoading(true)
          const res=await fetch( `/api/product/favourites`)
          const data=await res.json()
          setfavoutie(data)
         }
         catch(err)
         {
          console.log(err)
         }
         finally
         {
          setLoading(false)
         }
      }
      getfavourites()
    },[])

    return (
   <>
   {
    loading && <div 
    className='flex w-full justify-center mt-5 
     items-center'>
   <Spinner/>
    </div> 
} 
      <div style={{userSelect:'none'}} 
      className={`flex flex-col ${searchproduct ? "opacity-50 " :"" }`}>
          <div className='flex  pl-2 pt-3 
           justify-between'>
          <div className='flex flex-col gap-1
          md:flex-row  sm:flex-row md:items-center 
          lg:items-center  sm:items-center lg:flex-row'>
          <div className='md:text-md
          lg:text-md   text-sm font-md'>
        Your favourite products
       </div>
      <div className='text-md font-medium'>
          {user?.name}
      </div>
      </div>
        {/* <div className='md:text-md
          lg:text-md   text-sm 
        md:mr-3 lg:mr-3 mr-1
          font-medium text-red-400 cursor-pointer
        hover:text-red-600 gap-1 flex flex-wrap hover:border-b-2
        hover:border-red-400'>
         <div className=''>
         Remove
         </div>
        <div className=''>
          all products
        </div>
        </div>                  */}
        </div>
        {
  !loading && favourite?.length ===0  ? 
        <div style={{userSelect:'none'}} className='flex flex-col 
        text-lg font-medium items-center mt-40 justify-center'>
          No favourite prodects yet
        </div>  :   
        <div  className={`flex items-center  
       ${favourite?.length % 4 === 0 ?  "justify-center" : 
         "justify-start "} mx-2
      gap-2  w-[100%] mt-2 flex-wrap 
      md:flex-row lg:flex-row sm:flex-row flex-col`}>
        
        {
          favourite?.map((product)=>(
            <Productcart 
            key={product._id}
            product={product}/>
          ))
        }
        </div>
}
      </div>
   
   </>
  )
}

export default Favourtepage