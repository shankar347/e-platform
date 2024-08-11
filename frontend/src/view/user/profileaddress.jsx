import { Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import useratom from '../atom/useratom'

const Profileaddress = () => {
  
  const [address,updateaddress]=useState({
    housenumber:'',
    streetname:'',
    pincode:'',
    nearestplace:'',
    area:''
  })  
  
  const [user1,setuser]=useRecoilState(useratom)
  const [loading,setloading]=useState(false)
  const user=user1.token
  const navigate=useNavigate()
  const toast=useToast()

  useEffect(()=>{
    if(user.address)
    {
      updateaddress(user.address)
    } 
  },[])

  const updateprofileaddress=async()=>{
   try{
      if  (!address.housenumber && !address.streetname
         && !address.pincode && !address.nearestplace && 
         !address.area
      )
      {
         toast({
            description:'Provide atleast one field to Submit',
            status:'error'
         })
         return
      }

      setloading(true)
   const res=await fetch(`/api/user/profile/${user._id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            housenumber:address.housenumber,
            streetname:address.streetname,
            pincode:address.pincode,
            nearestplace:address.nearestplace,
            area:address.area
        })
    })
    const data=await res.json()
    console.log(data)
    if(data.error)
    {
       toast({
        description:data.error,
        status:'error',
        duration:9000,
       })
       return
    }
    toast({
      description:"Address added successfully",
      status:'success',
      duration:9000,
   })
   var existtoken=JSON.parse(localStorage.getItem('token')) 
   var token=JSON.stringify({
      token:data,
      expiresAt:existtoken?.expiresAt 
    })   

     localStorage.setItem('token',token)
     navigate('/')
     setuser(JSON.parse(token))
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
    
  return (
   <div className='  bg-[rgba(255,191,0,0.749)]  h-screen' 
   style={{userSelect:'none'}}>
    <div className=' max-w-md w-full pt-16 px-5 mx-auto h-full '>
     <h1 className='text-red-500 text-2xl
     font-semibold mb-7'>Update Address</h1>
     
     <div className='flex flex-col w-full gap-2 mb-5'>
     <label htmlFor="" 
     className='text-md font-semibold '>Flat Number / Home Number</label>
     <input type="text" value={address.housenumber}
      className='w-full rounded pl-2 rounded-200 h-7 
      outline-none'
      onChange={(e)=>
      updateaddress({...address,housenumber:e.target.value})}/>
     </div>

     <div className='flex flex-col w-full gap-2 mb-5'>
     <label htmlFor="" 
     className='text-md font-semibold '>Street</label>
     <input type="text" 
     value={address.streetname}
     onChange={(e)=>
        updateaddress({...address,streetname:e.target.value})}
      className='w-full 
      pl-2 rounded rounded-200 h-7 
      outline-none'/>
     </div>

     <div className='flex flex-col w-full gap-2 mb-5'>
     <label htmlFor="" 
     className='text-md font-semibold '>Area</label>
     <input type="text" 
     value={address.area}
     onChange={(e)=>
        updateaddress({...address,area:e.target.value})
     }
      className='w-full pl-2 
       rounded rounded-200 h-7 
      outline-none'/>
     </div>

     <div className='flex flex-col w-full gap-2 mb-5'>
     <label htmlFor="" 
     className='text-md font-semibold '>Nearest Place</label>
     <input type="text" 
     value={address.nearestplace}
     onChange={(e)=>
        updateaddress({...address,nearestplace:e.target.value})
     }
      className='w-full pl-2  rounded rounded-200 h-7 
      outline-none'/>
     </div>

     <div className='flex flex-col w-full gap-2 mb-1'>
     <label htmlFor="" 
     className='text-md font-semibold '>Pincode</label>
     <input type="text" 
     value={address.pincode}
     onChange={(e)=>
        updateaddress({...address,pincode:e.target.value})}
      className='w-full rounded pl-2  rounded-200 h-7 
      outline-none'/>
     </div>
      <div className='text-md pl-1 mb-5 text-red-500'>
        * address must be in chennai city
      </div>
      <div className='w-full justify-center flex'>
      <button onClick={updateprofileaddress}
      className='w-32 rounded-full h-12 
      mx-auto bg-red-500 hover:bg-red-400 
      focus:bg-red-400 text-sm mt-0 md:mt-5 lg:mt-5 sm:mt-3 text-white
      '> 
       {loading ? <Spinner/> : "Submit"}
        </button>
     </div>
    </div>
   </div>
  )
}

export default Profileaddress