  import React, { useContext, useEffect, useState } from 'react'
  import { useRecoilValue } from 'recoil'
  import useratom from '../atom/useratom'
  import Cartinfo from './cartinfo'
  import { FaCartPlus } from 'react-icons/fa'
  import { prouductcontext } from './productcontext'
  import { Spinner } from '@chakra-ui/react'
  import { useLocation, useNavigate } from 'react-router-dom'

  const Cartpage = () => {
    
    const {allcartproducts,setallcartproducts,
      cartloading,setcartloading,
      orders,setorders,
      totalamount,settotalamount,
      selected,setselected
    } =useContext(prouductcontext)
   
    const navigate=useNavigate()

    // console.log(selected)

    // console.log(allcartproducts)
    const quantity=allcartproducts?.products?.map((product)=>product?.quantity)
     console.log(allcartproducts)
    
     

    const getselectedproductdetails=async(productid)=>{
        try{
        const res= await fetch(`/api/product/${productid}`)
        const data=await res.json()
        return data
        }
        catch(err)
        {
          console.log(err)
        }
    }
 

    
    const calculatetotalamount=async()=>{
      let total=0
    
      for (const productId of selected){
        
        const product=allcartproducts?.products?.find(
          (product)=>product._id === productId 
        )

        if(product)
        {
          const productdetails=await getselectedproductdetails(product.product)
        
          if(productdetails)
          {
            total+=productdetails?.price * product.quantity
          }
          // console.log(product)
          // console.log(productdetails)
        }
      }
   
      settotalamount(total)
  }

  const savetolcoal=(selectedp,totalpricep)=>{
    localStorage.setItem('cart',JSON.stringify({
      selected:selectedp,
      totalprice:totalpricep
    })) 
   }

 
   

  useEffect(()=>{
    calculatetotalamount()
    
  },[selected,allcartproducts])

    const deleteallproduct=async()=>{
      try{
      setcartloading(true)
      const res=await fetch('/api/cart/delete',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
      })
      const data=await res.json()
      setallcartproducts(data)
      }
        catch(err) {
        console.log(err.message)
      }
      finally{
        setcartloading(false)
      }
    }


    useEffect(()=>{
      const getallcartproducts=async()=>{
      try
      {
        setcartloading(true)
      const res=await fetch('/api/cart')
      const data=await res.json()
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
      getallcartproducts()
    },[])

    const createorders=()=>{

    }

      const user=useRecoilValue(useratom)
      const {searchproduct,setsearchproduct}=useContext(prouductcontext)
      
      return (
      <div style={{userSelect:'none'}} 
      className={`flex flex-col ${searchproduct ? "opacity-50 " :"" }`}>
          <div className='flex  pl-2 pt-3 
          justify-between'>
          <div className='flex flex-col md:flex-row
          lg:flex-row sm:flex-row gap-0
             md:gap-2 lg:gap-2 sm:gap-1
                 md:items-center lg:items-center'>
          <div className='md:text-md
          lg:text-md   text-sm font-md'>
        Select to buy proudcts 
      </div>
      <div className='text-md font-medium'>
          {user?.name}
      </div>
      </div>
        <div className='md:text-md
          lg:text-md   text-sm 
        md:mr-3 lg:mr-3 mr-1
          font-medium text-red-400 cursor-pointer
        hover:text-red-300 gap-1 flex flex-wrap 
        '
        onClick={deleteallproduct}>
        <div className=''>
        Remove
        </div>
        <div className=''>
          all products
        </div>
        </div>                 
        </div>
        
        <div className='flex  
        mb-10 flex-col mt-5'>
    {
    ! cartloading && allcartproducts?.products?.length !==0  ? 
      allcartproducts?.products?.map((cartproduct)=>(
          <Cartinfo product={cartproduct} 
          key={cartproduct._id}  
          selected={selected}
          setselected={setselected}
          onClick={(selectedproduct)=>{
          setselected(prev =>{
          if(prev.includes(selectedproduct._id))
          {
            return prev.filter(id => id !== selectedproduct._id)
          }
          else{
            return [...prev,selectedproduct._id]
          }
          }
          )
          }}/>
        ))  
        : 
      ! cartloading && <div className='flex flex-col 
        text-lg font-medium items-center mt-40 justify-center'>
          No items in cart
        </div> 
        
      
    }
      {
        cartloading && <div className='flex w-full 
        justify-center mt-5  items-center ' >
        <Spinner/>
        </div>
      }

        </div>

        <div className='fixed md:w-[85%] lg:w-[85%] w-full h-10 downbar
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
        ₹{totalamount}.00
        </div>
        </div>
        <button 
         className={`bg-green-600 
          hover:bg-green-500 focus:bg-green-500 flex items-center
          text-md rounded-md w-32 h-9  gap-2 
          justify-center  cursor-pointer md:mr-5
          sm:mr-5 mr-1 ${totalamount >=200 ?
            "opacity-100" :"opacity-50"
          }`}
          onClick={()=>{
            navigate(`/${user._id}/orderlist`)
            savetolcoal(selected,totalamount)
          }}
           disabled={totalamount<200}>
          
          <FaCartPlus className='h-7 w-7'
          /> 
          <div className='text-md font-medium'>
            Buy
          </div>
          </button>
        </div>
        </div> 
      </div>
    )
  }

  export default Cartpage