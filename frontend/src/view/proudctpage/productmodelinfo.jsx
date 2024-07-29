import React, { useContext, useEffect, useState } from 'react'
import star from '../../assets/star.png'
import heart from '../../assets/emptyheart.png'
import redheart from '../../assets/heart.png'
import useratom from '../atom/useratom'
import { useRecoilValue } from 'recoil'
import { prouductcontext } from './productcontext'
import { useNavigate } from 'react-router-dom'
import { Spinner, useToast } from '@chakra-ui/react'

const Productmodelinfo = ({product}) => {
  
    const toast = useToast()
    const [like,setlike]=useState(false)
    const user=useRecoilValue(useratom)
    const {allcartproducts,setallcartproducts,
      setsearchproduct  ,
      favourite,setfavoutie    
    } =useContext(prouductcontext)
    const navigate=useNavigate()
    const [loading, setLoading] =useState(false)
   
    useEffect(()=>{
      if(product.likes.includes(user._id))
      {
       setlike(true)
      }
   },[])

   const handlelike=async(e)=>{
    e.stopPropagation()
    try{   
      const res=await 
      fetch(`/api/product/${product?._id}/favourites`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({

        })
      })
      const data=await res.json()

      if(data.error)
        {
          toast({
            description:data.error,
            status:'error',
            duration:2000,
          })
          return
        }
      setlike(true)
      setfavoutie(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  

  const addtocart=async(e)=>{
    e.stopPropagation()
    try{
      setLoading(true)
      const res= await fetch('/api/cart',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          productid:product._id,
           quantity:1
        })
      })
      const data=await res.json()

      if(data.error)
      {
        toast({
          description:data.error,
          status:'error',
          duration:2000,
        })
        return
      }
      toast({
        description:'Added to cart',
        status:'info',
        duration:2000,
      })
     setallcartproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }



  return (
    <div className='flex gap-2 md:gap-5
     lg:gap-5 border-b-2 
    border-gray-300 pb-3 mx-1 
    relative 
    hover:opacity-80 py-2
    focus:opacity-80'
    onClick={()=>{
      navigate(`/${user._id}/${product._id}`)
     setsearchproduct(false)
    }} >
    <div className='md:w-48 lg:w-48 w-32 
     md:h-32 lg:h-32 '>
     <img src={product?.image} 
     className='w-full h-full'
     alt="" />
    </div>
    <div className='absolute top-1 right-1'>
    <img src={like ? redheart : heart}
     alt="" className='w-5 h-5 cursor-pointer'
     onClick={handlelike}/>
    </div>

    <div className='flex flex-col'>
    <div className='text-lg font-medium'>
    {product?.name}
    </div>
    <div className='flex gap-1 mt-2'>
    <img src={star} alt=""  className={`w-4 h-4
        ${product?.likes?.length >= 1 ?  "opacity-100" : "opacity-40" }`}/>
      <img src={star} alt="" className={`w-4 h-4
        ${product?.likes?.length > 4 ?  "opacity-100" : "opacity-40" }`}/>
      <img src={star} alt="" className={`w-4 h-4
        ${product?.likes?.length > 6 ?  "opacity-100" : "opacity-40" }`}/>
      <img src={star} alt="" className={`w-4 h-4 
        ${product?.likes?.length > 8 ?  "opacity-100" : "opacity-40" }`}/>
      <img src={star} alt="" className={`w-4 h-4 
      ${product?.likes?.length > 10 ?  "opacity-100" : "opacity-40" }
      `}/>  
    </div>
    <div className='flex flex-col md:flex-row
    lg:flex-row mt-2 md:gap-5
    lg:gap-5 gap-1'>     
    <div className='flex gap-2'>
     <div className='text-md'>
        Old Price
     </div>
     <div className='text-md  line-through'>
     ₹{product.price}.00
     </div>
    </div>
    <div className='flex gap-2'>
    <div className='text-md'>
     New Exclusive price
    </div>
    <div className='text-md text-red-400'>
    ₹{product.price}.00
    </div>
    </div>
    </div>
   <div className='flex justify-around'> 
   <button  className='bg-[rgb(244,174,44)] 
     rounded-full md:w-32 lg:w-32 sm:w-32
     w-28 py-1 md:py-1 lg:py-1 sm:py-1.5     
     text-md hover:bg-orange-300 
     focus:bg-orange-300 mt-2 mx-auto'  
     onClick={addtocart} >
        {loading ? <Spinner/> : 
        "Add to cart"}
         </button>
  
   </div>
    </div>
    </div>
  )
}

export default Productmodelinfo