import React, { useContext, useEffect, useState } from 'react'
import Productcart from '../proudctpage/productcart'
import { GiRunningShoe, GiUsaFlag } from 'react-icons/gi'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import { prouductcontext } from '../proudctpage/productcontext'
import { Spinner } from '@chakra-ui/react'  
import logo from '../../assets/cartlogo.png'
import indialogo from '../../assets/square.png'

const Mainpage = () => {

  const {searchproduct,setsearchproduct}=useContext(prouductcontext)
  const [topproducts,settopproducts]=useState(null)
  const [newproducts,setnewproducts]=useState(null)
  const [randomproduts,setrandomproducts]=useState(null)
  // console.log(topproducts)
  // console.log(randomproduts)
  // console.log(newproducts)
 
  

  
     
  const {
    orders,setorders,
    totalamount,settotalamount,
    selected,setselected
} = useContext(prouductcontext)

// console.log(totalamount)
// console.log(selected)

const [loading,setLoading]=useState(false)

 useEffect(()=>{
  const gettopproducts=async()=>{

    try
    {
   setLoading(true)
     const res=await fetch(`/api/product/topproduct`)
     const data=await res.json()
     settopproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  const getrandomproducts=async()=>{
    try
    {
     const res=await fetch(`/api/product/random-product`)
     const data=await res.json()
     setrandomproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  const getnewproducts=async()=>{
    try
    {
     const res=await fetch(`/api/product/new-product`)
     const data=await res.json()
     setnewproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  gettopproducts()
  getrandomproducts()
  getnewproducts()
 },[])

  return (
    <>

    {
      topproducts.length ===0 && 
      randomproduts.length ===0 && 
      newproducts.length ===0 ? <div className='flex flex-col
      justify-center items-center 
      font-medium mt-60'>
          No products are uploaded
      </div>
    
    :
    <>
    {
      loading ? <div className='flex w-full
      items-center justify-center mt-10'>
        <Spinner />
      </div> : 
         <div 
         style={{userSelect:'none'}}
          className={`flex flex-col ${searchproduct ? "opacity-50 " :"" }`}>
          <div className='text-md font-semibold pl-2 pt-2'>
            Products for you</div>      
          <div className='flex  items-center
           md:flex-row lg:flex-row sm:flex-row flex-col
           justify-center    gap-2 w-[100%] mt-2 px-2'>
      {
        newproducts?.map((produt)=>(
          <Productcart product={produt}
          key={produt._id} />
        ))
      }
      
          </div>
          <div className='text-md font-semibold pl-2 pt-2'>
          Top Rated 
         </div>
          <div className='flex items-center justify-center 
          gap-2 w-[100%] mt-2 px-2 
          md:flex-row lg:flex-row sm:flex-row flex-col'>
       {
        topproducts?.map((produt)=>(
          <Productcart product={produt}
          key={produt._id} />
        ))  
      }
          </div>
          <div className='text-md font-semibold pl-2 pt-w'>
            You Also Like
          </div>
          <div className='flex items-center justify-center 
          gap-2 w-[100%] mt-2 px-2 
          md:flex-row lg:flex-row sm:flex-row flex-col'>
          {
        randomproduts?.map((produt)=>(
          <Productcart product={produt}
          key={produt._id} />
        ))  
      }
          </div>
          <div className='flex flex-col  mt-5 '>
          <div className='flex gap-2  items-center   justify-center'>
          <img src={logo} 
     className='w-7 h-7 rounded' />
           <div className='font-poppins text-lg  font-semibold'>
            sravcart
            </div> 
          </div>
          <div className='flex justify-center'>
          <div className='w-64 h-1  bg-[rgb(244,174,44)] rounded-full mt-2'>
      
      
          </div>
          </div>
          <div className='flex flex-col items-center  mt-2 justify-center'> 
          <div className='text-lg font-medium'>
            For any help or problems contact us
          </div>
          <div className='flex gap-2 items-center mt-2'>
          <img src={indialogo} 
     className='w-5 h-5 rounded' />
            <div className='text font-md'>
              +91 9940394425
            </div>
          </div>
          <div className='flex gap-2 mt-5 pb-5'>
           <img src={instagram} alt="" className='w-6 h-6  cursor-pointer'/>
           <img src={facebook} alt=""  className='w-6 h-6 cursor-pointer'/>
           <img src={twitter} alt=""  className='w-6 h-6 cursor-pointer' />
          </div>
          </div>
          </div>
         </div>
    }
    </>
}
   </>
  )
}

export default Mainpage