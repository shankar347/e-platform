import React, { useContext, useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { prouductcontext } from './productcontext'
import { Spinner, useToast } from '@chakra-ui/react'
const Cartinfo = ({product,onClick,selected,setselected}) => {
   
    console.log(selected)

      const [totalcount,settotalcount]=useState(0 )
    const [product1,setproduct]=useState(null)

    const {allcartproducts,setallcartproducts,
      cartloading,setcartloading
    } =useContext(prouductcontext)

    const [loading,setloading]=useState(false)

  const toast=useToast()
  
  var totalprice= product?.quantity *  product1?.price

  useEffect(()=>{
   if(product?.quantity )
   {
    settotalcount(product?.quantity )
   }
  },[product?.quantity ])

  const increasequantity=async()=>{
   
    try{
      setloading(true)
      const res=await fetch('/api/cart',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          productid:product.product,
          quantity:totalcount+1
        })
      })
      const data=await res.json()
      if (data.error)
      {
        toast({
          description:data.error,
          status:'error',
          duration:2000,
        })
        return
      }
      setallcartproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setloading(false)
    }
  }

  const deccreasequantity=async()=>{
    
    try{
      setloading(true)
      const res=await fetch('/api/cart',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          productid:product.product,
          quantity:totalcount-1
        })
      })
      const data=await res.json()
      if (data.error)
      {
        toast({
          description:data.error,
          status:'error',
          duration:2000,
        })
        return
      }
      setallcartproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setloading(false)
    }
  }

  
  const handledecrease=()=>{
    const handlenumberdecrease=()=>{
      settotalcount((prevnum)=>(
          prevnum === 0 ? 0 : totalcount - 1
  
      ))
      
       }
     handlenumberdecrease()
     deccreasequantity()
  }


  const handleincrese=()=>{
    settotalcount(totalcount +1)
    increasequantity() 
  }
  
  

  const removeproduct=async()=>{
     try{
      setcartloading(true)
      const res=await fetch('/api/cart/remove',
        {
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({
            productid:product.product
          })
        })
        const data=await res.json()
        if (data.error)
          {
            toast({
              description:data.error,
              status:'error',
              duration:2000,
            })
            return
          }
          setallcartproducts(data)
     }
     catch(err)
     {
      console.log(err)
     }
     finally{
      setcartloading(false)
     }
  }


   useEffect(()=>{
     const getproduct=async()=>{
      try
      {
      const res=await fetch(`/api/product/${product.product}`)
      const data=await res.json()
       setproduct(data)
      
      }
      catch(err)
      {
        console.log(err)
      }
     }
     getproduct()
   },[product.product,totalcount])


  //  console.log(product1)
  return (
   <>
   {
    !loading ?  <div className='flex  pb-2 border-b-2
    border-gray-300 h-40 mx-2 lg:mx-4 md:mx-4 sm:mx-4 py-2'>
     <div className='md:w-36 lg:w-36 sm:w-36  w-36 h-full '>
     <img src={product1?.image} alt='' 
     className='w-[100%] h-full'
     loading='lazy'/>
     </div>
     <div className='flex items-center justify-center flex-col ml-2 sm:ml-7 md:flex-row
     lg:flex-row '>
      <div className='flex flex-col my-auto sm:gap-16 items-center sm:flex-row md:flex-row  lg:flex-row'>
     <div className='flex flex-col md:flex-row lg:flex-row'>
      <div className='ml-0 md:ml-10 lg:ml-10
       md:w-52 lg:w-52 '>
        <p className='text-xl sm:mb-3  font-semibold'>
      {product1?.name}
        </p>
      </div>
      <div className='flex gap-2'>
        <div className=' lg:text-lg md:text-lg sm:text-lg text-md
         md:hidden lg:hidden 
        block  font-semibold w-14 ml-1'>
        Price
        </div>
      <div className='lg:text-lg md:text-lg sm:text-lg text-md
       font-semibold 
      md:w-20  lg:w-20 sm:mb-3'>
       ₹{product1?.price}
      </div>
      </div> 
      <div className='flex gap-2 sm:mb-2'>
      <div className='lg:text-lg
      ml-1 md:text-lg  sm:text-lg text-md
       md:w-20
      lg:w-20  md:ml-10 lg:ml-10
       font-semibold w-14'> 
         {product?.quantity} Nos
      </div>
      <div  className='lg:text-lg md:text-lg sm:text-lg text-md
       md:w-20 lg:w-20  
      md:ml-10 lg:ml-10 ml-0
       font-semibold '>
      ₹{totalprice}
      </div>  
      </div>
      </div>
      <div className='flex md:ml-40 lg:ml-40 ml-0 
         items-center sm:mb-7
       flex-col justify-end md:mt-10 lg:mt-10 
       mt-2'>
      <div className='flex gap-3 items-center'>
        <button disabled={totalcount === 1} 
        onClick={handledecrease}
        >
        <FaMinus className={` cursor-pointer 
        ${totalcount ===1 ? 'opacity-30' :''}`} 
        />
        </button>
       <div>
        {totalcount}
       </div>
      <FaPlus className='cursor-pointer' 
      onClick={handleincrese}/>
      </div>
      <div className='flex mt-2 md:mt-5 lg:mt-5
      sm:mt-5  gap-1'>
        <button className='bg-red-400 
        hover:bg-red-300 focus:bg-red-300
        text-md rounded-full md:w-32 lg:w-32 sm:w-32
        w-20  h-8 md:h-10 lg:h-10  cursor-pointer '
        onClick={removeproduct}>
        remove
        </button>
        <button className='bg-[rgba(255,191,0,0.749)]
        hover:bg-[rgba(255,191,0,0.549)]
         focus:bg-[rgba(255,191,0,0.549)]
        text-md rounded-full md:w-32 lg:w-32 sm:w-32
        w-20 h-8 md:h-10 lg:h-10 cursor-pointer '
         onClick={()=>onClick(product)}>
          {selected?.includes(product._id) ? "unselect" : "select" }
        </button>
      </div>
      </div>
     </div>
      </div>
    </div> : <div className='flex justify-center
    items-center  mt-10'>
      <Spinner />
    </div>
   }
   </>
  )
}

export default Cartinfo