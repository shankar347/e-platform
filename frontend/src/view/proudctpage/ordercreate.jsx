import React, { useContext, useEffect, useState } from 'react'
import { prouductcontext } from './productcontext'
import { Flex, Spinner, Text, useToast} from '@chakra-ui/react'
import {useMediaQuery} from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import Ordercreateinfo from './ordercreatinfo'


const Ordercreate = () => {
   
    const {
        orders,setorders,
        totalamount,settotalamount,
        selected,setselected
    } = useContext(prouductcontext)
    
    const user=useRecoilValue(useratom)
   
    const checkphone=useMediaQuery({query:'(min-width: 768px)'})
    console.log(checkphone)
    const navigate=useNavigate()
    const [loading,setloading]=useState(false)

    const [details,setdetails]=useState(null)
    console.log(details)
    
    const toast=useToast()

    let value;
   
    useEffect(()=>{
   
     value=JSON.parse(localStorage.getItem('cart'))
         
     setdetails(value)
    },[])
  
    const cancelorder=()=>{
        localStorage.removeItem('cart')
        setdetails(null)
        navigate(`/${user._id}/cart`)
    }
 
    console.log(details)
    console.log(user?.address)
    const createorder=async()=>{

      try{
       if(!details) return;
   
       if(!user?.address?.housenumber ||
        !user?.address?.nearestplace ||
        !user?.address?.pincode ||
        !user?.address?.streetname ||
        !user?.address?.area
       )
      {
        toast({
          description:"Fill all details in address",
          status:'error',
          duration:2000,
        })
        return
      }
       setloading(true)
       const fetchproductfromcart=details?.selected?.map(async(cartid)=>{
       
        const cartres=await fetch(`/api/cart/${cartid}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          } 
        })
        const cartdata=await cartres.json()
        return cartdata
       })
       const fetchproductfromcartdata=await Promise.all(fetchproductfromcart)
       console.log(fetchproductfromcartdata)
       
       const res=await fetch(`/api/order`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          products:fetchproductfromcartdata,
           totalamount:details.totalprice
        })
       })
       const data=await res.json()
       console.log(data)
       if(data && data._id)
       {
        navigate(`/${user._id}/paymentoptions`,{state:
            {orderId:data._id}
        })
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



  return (
    <div style={{userSelect:'none'}}> 
        {
            !details ?
        <Flex w={'full'}
            h={'full'}
            justifyContent={'center'}
            alignItems={'center'} 
            flexDirection={'column'}>
             <Text mt={'10'} fontSize={'lg'}  fontWeight={'600'}
             >
                Error in fetching products
             </Text>
             <Text mt={'2'}
             fontSize={'md'}
             fontWeight={'600'} textColor={'blue.400'}
            onClick={()=>navigate('/')}
            >
                Go back to home page
             </Text>
            </Flex>

        : 
        <div className='flex flex-col'>
        <div className='mb-10 flex flex-col'>
        <div className='flex w-full 
          mt-3 justify-between mb-2 px-4'>
            <div className='flex md:flex-row
          lg:flex-row flex-col gap-2'>
          <div className='text-lg font-medium'>
             Check your products
            </div> 
            {/* <div className='t   ext-lg font-medium'>
                {user?.name}
            </div> */}
            </div>  
           <div className='text-md font-medium
           text-red-400 
           cursor-pointer'
           onClick={()=>cancelorder()}>
            Cancel 
           </div>  
          </div>
          <div className=''>
          {
           details?.selected?.map((product)=>(
            <Ordercreateinfo product={product}
            key={product}/>
           ))
          }
          </div> 
        </div>
        <div className='fixed md:w-[85%] lg:w-[85%] 
         w-full h-10 downbar
        bg-[rgb(244,174,44)] items-center h-10  bottom-0 
        '>
        <div className='flex h-full w-full items-center 
        justify-between'>
        <div className='flex md:pl-10  lg:pl-10 sm:pl-10 pl-2
        gap-2'> 
        <div className='text-md font-medium'>
          Total Amount :
        </div>
        <div className='text-md font-bold'>
        ₹{details.totalprice}.00
        </div>
        </div>
        <button 
         className={`bg-green-600 
          hover:bg-green-500 focus:bg-green-500 
          flex items-center
          text-md rounded-md w-32 h-9  gap-2 
          justify-center  cursor-pointer md:mr-5
          sm:mr-5 mr-1 `}
          onClick={()=>{
           createorder()
          }}
          >
        {
          loading ?  <Spinner/> : 
          <div className='text-md font-medium'>
            {checkphone ? "Confirm order" : "Confirm"  }
          </div>
        }
          </button>
        </div>
        </div> 
         </div> 
} 



        </div>
  )
}

export default Ordercreate