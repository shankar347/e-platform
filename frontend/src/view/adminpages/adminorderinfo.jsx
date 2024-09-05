import { Avatar, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Timecompnent from '../hooks/timecompnent'
import { prouductcontext } from '../proudctpage/productcontext'
import { useNavigate } from 'react-router-dom'

const Adminorderinfo = ({order}) => {
  

   const navigate=useNavigate()
   const [user,setuser]=useState(null)
   const [order1,setorder]=useState(order)
  //  console.log(order1?.orderitems.map)
   const [update,setupdate]=useState(false)
   const [loading,setLoading]=useState(false)
   const [updatedstatus,setupdatedstatus]=useState(order?.status || null)
   const {adminorders:orders,setadminorders:setorders} =useContext(prouductcontext) 
  //  console.log(updatedstatus)
  //  console.log(order1)
  // console.log(user)
  // console.log(user?.address)
  useEffect(()=>{
    const fetchuser=async()=>{
        try{
           
            const res=await fetch(`/api/user/${order?.userid}`)
            const data=await res.json()
            setuser(data)
        }
        catch(err)
        {
            console.log(err)
        }
       }
       fetchuser()
  },[order?.userid])


  
  // console.log(user)

  const handleupdate=async(status)=>{
    try{
        setLoading(true)
     const res=await fetch(`/api/order/${order._id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
          status:status  
        })
     })
     const data=await res.json()
     if(data.error)
     {
        return
     }
     setupdatedstatus(status)  
     setorder(data)
    }
    catch(err)
    {
        console.log(err)
    }
    finally{
        setLoading(false)
    }
  }

  const handledropdownchange=(e)=>{
    const newstatus=e.target.value;
     handleupdate(newstatus)
     setupdate(false)
  }

  return (
    <>
    {
        loading ? <div
        className='w-full flex justify-center mt-5 items-center'>
          <Spinner/>
        </div>
        :
        <div className='flex px-1 flex-col h-[270px]'>
    <div className='flex 
     gap-6'>
     <Avatar name={user?.name} 
      h={'14'} w={'14'}/>
      <div className='flex flex-col'>
       <div className='text-lg  font-medium'>
         {user?.name}
       </div>
       <div className='flex flex-col'>
       <div className='text-md  font-medium'>
        {user?.email}
       </div>
       </div>
       <div className='flex gap-2'>
       <div className='text-md  font-medium'>
          Total price
       </div>
       <div className='text-md  font-medium'>
       ₹{order1?.totalprice}
       </div>
       </div>
       <div className='flex w-full gap-2 '>
       <div className='text-md  font-medium'>
        <Timecompnent date={order1?.orderdate}/> 
       </div>
       <div className='text-md  font-medium'>
        {user?.phoneno}
       </div>
       </div>
     {
        update ?
        <select name="" id="" 
        className='w-[100px] h-[30px]
        border-2 border-bg-[rgb(244,174,44)]
        cursor-pointer' 
        onChange={handledropdownchange}
        value={updatedstatus}
        >
          <option 
          value="Cancelled">
            Cancelled
          </option>
          <option value="Shipped">
            Shipped
          </option>
          <option value={"Delivered"}>
            Delivered
          </option>
        </select>
        :  <div className={`text-md font-medium   
            h-[30px]     ${order1?.status === 
            "Delivered" ? "text-green-400"
             : order1?.status === "Cancelled" ?
                 "text-red-400" : order1?.status === "Pending" ?
                  "text-yellow-400"
                 : "text-blue-400"
                }`} >
            {order1?.status}
            </div>
     }
      </div>
    </div>
    
    <div className='flex text-sm'> 
    <div className='flex flex-col pl-2'>
      <div className='flex gap-4'>
      {
        user?.address?.housenumber &&
        <div className='font-medium text-md'>
          {user?.address?.housenumber}
        </div>
        
      }    
       {
        user?.address?.streetname &&
        <div className='font-medium text-md'>
           {user?.address?.streetname}
        </div>       
      }  
      </div>
      {
        user?.address?.area &&
        <div className='font-medium text-md'>
          {user?.address?.area}
        </div>       
      }  

      <div className='flex gap-2'>
      {
        user?.address?.nearestplace &&
        <div className='font-medium text-md'>
          {user?.address?.nearestplace}
        </div>       
      }  
       {
        user?.address?.pincode &&
        <div className='font-medium text-md'>
        {user?.address?.pincode}
        </div>       
      }  


       </div>

    </div>   
    <div className='flex flex-col text-sm font-medium ml-2' >
      <div>
        Products
      </div>
      
      {order1?.orderitems?.map((item)=>(
            <div className='flex flex-col'>
              <div className=' hover:text-gray-700 cursor-pointer'
               onClick={()=>navigate(`/${user._id}/${item?.product?._id}`)}
               >
              {item?.product?._id}
              </div>
             {
              item?.color &&  <div className='flex items-center gap-2'>
              <div className=''>
               Color:
              </div>
              <div>
               {item?.color}
              </div>
             </div>
             }
            </div>
          ))}
    </div>
     </div>

    <div className='flex gap-4 mt-1 items-center  px-2'>
     <div className='flex text-sm flex-col'>
     <div className='text-md font-medium'>
        Order id
       </div>
       <div className='text-md font-medium 
      ' 
      >
        {order1?._id}
       </div>
       </div>
      {
        !update ?
        <button className='w-28 h-9 rounded-full
        bg-[rgb(244,174,44)] font-medium cursor-pointer
        focus:bg-orange-400
        hover:bg-orange-400'
        onClick={()=>setupdate(true)}>
         update 
       </button>
       :
       <button className='w-28 h-9 rounded-full
       bg-red-400 cursor-pointer
       focus:bg-red-300
       hover:bg-red-300'
       onClick={()=>setupdate(false)}>
        cancel 
      </button>
      }
    </div>
    </div>
    }
    </>
  )
}

export default Adminorderinfo