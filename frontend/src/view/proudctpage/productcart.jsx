  import React, { useContext, useEffect, useState } from 'react'
  import star from '../../assets/star.png'
  import heart from '../../assets/emptyheart.png'
  import redheart from '../../assets/heart.png'
  import {Spinner, useToast} from '@chakra-ui/react'
import { prouductcontext } from './productcontext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'

  const Productcart = ({product}) => {
    
    const toast = useToast()
    const [like,setlike]=useState(false)
    const [loading, setLoading] =useState(false)
    const user1=useRecoilValue(useratom)
    const user=user1?.token
    // const user=user1
    const {allcartproducts,setallcartproducts} =useContext(prouductcontext)
    const navigate=useNavigate()
    // console.log(product  )
   
    const pahtname=useLocation()
    const path=pahtname.pathname 
   
    const regex=/^\/[^/]+\/favourites$/;

    const checkpath=regex.test(path)


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
      <div 
      onClick={()=>navigate(`/${user._id}/${product._id}`)}
      className={`flex 
      hover:opacity-80
      active:opacity-80
      md:flex-col lg:flex-col  
      sm:flex-col  pt-1 
      ${checkpath ? "md:w-[310px] lg:w-[310px] " 
        : "md:w-[340px] lg:w-[340px]"} 
        md:h-[400px] 
      lg:h-[400px]  
      lg:border-2 lg:border-[rgb(244,174,44)] 
      md:border-2 
      md:border-[rgb(244,174,44)] 
      sm:border-2 sm:border-[rgb(244,174,44)]
      border-1 border-transparent
      rounded-md shadow-md  cursor-pointer relative`}>
      <img src={product?.image} alt="image" 
      className='md:w-full lg:w-full
      sm:w-full w-[37%] md:h-[55%]
      lg:h-[55%]
      sm:h-[55%] py-2'   />
    {
     ! checkpath && 
     <div className='absolute top-1 right-1'>
     <img src={like ? redheart : heart} alt="" className='h-5 w-5
     cursor-pointer' 
     onClick={handlelike}
     />
     </div>
    }
      <div className='flex flex-col
       pl-3   md:pl-3
      lg:pl-3 sm:pl-3  pt-0 md:pt-2
      lg:pt-2 sm:pt-2 '>
      
    
      <div className='text-lg font-medium '>
  {product?.name}
      </div>
      <div className='flex gap-1 mt-1'> 
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
      <div className='flex gap-1 pt-1'>
        <div className='text-md '>
        New Exclusive Price
        </div>
        <div className='text-red-500'>
        ₹{product?.price}.00
        </div>
      </div>
      <div className='flex gap-2 pt-1'>
        <div className='text-md'>
        Old Price
        </div>
        <div className='text-gray-700 line-through '>
        ₹{product?.price}.00
        </div>
      </div>
      <div className='w-full py-1  flex justify-center items-center'>
      <button className='bg-[rgb(244,174,44)] 
      rounded-full md:w-32 lg:w-32 sm:w-32
      w-28 py-1 md:py-1.5 lg:py-1.5 sm:py-1.5     
      text-md hover:bg-orange-300 
      focus:bg-orange-300' 
      onClick={addtocart} >
        {loading ? <Spinner  h={'4'} w={'4'}/> :
        "Add to cart"} 
      </button>
      </div>
      </div>
      </div>
    )
  }

  export default Productcart