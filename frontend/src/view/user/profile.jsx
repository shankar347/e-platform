import React, { useContext } from 'react'
import img1 from '../../assets/compra_online.jpg'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import Profilecart from '../proudctpage/profilecart'
import productitem from '../../assets/box.png'
import productcard from '../../assets/credit-card.png'
import productlock from '../../assets/padlock.png'
import productnavigation from '../../assets/travel.png'
import productuser from '../../assets/user.png'
import productfavourite from '../../assets/wishlist.png'
import { FaEnvelope, FaMapMarkedAlt, FaMapMarkerAlt, FaPhoneAlt, FaUser, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import { prouductcontext } from '../proudctpage/productcontext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Profile = () => {
  const [user,setuser]=useRecoilState(useratom)
  const navigate=useNavigate()
  const {searchproduct,setsearchproduct}=useContext(prouductcontext)
  const toast=useToast()
  console.log(user)
  const handledeleteaccount=async()=>{
    try
    {
     
     if(!window.confirm(
      "Are You want to delete your account")) return
      
     const res=await fetch(`/api/user`,{
      method:"DELETE"
     })
     const data=await res.json()
     
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
        description:"Account deleted successfully",
        status:'success',
        duration:4000,
     })
      navigate('/auth')
      localStorage.removeItem('token')
      setuser(null)
    }
    catch(err)
    {
      console.log(err)
    }
  }

  const logoutaccount=async()=>{
    try
    {
     const res=await fetch(`/api/user`)
     const data=await res.json()
     
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
        description:"Logged out successfully",
        status:'success',
        duration:4000,
     })
      navigate('/auth')
      localStorage.removeItem('token')
      setuser(null)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  


  return (
    <div style={{userSelect:'none'}}    className={`flex flex-col ${searchproduct ? "opacity-50 " :"" }`}>
     <div className=' flex flex-col w-[100%]'>  
     <div className='flex flex-col sm:flex-row  md:flex-row lg:flex-row
      gap-2 pl-2 pt-5' >
     <div className='text-lg font-medium'>
     Hi {user?.name} !
     </div>
    <div 
    className='text-lg font-semibold'>
    Welcome to foot-kit
      </div>  
     </div>
     <div className='flex flex-col
     sm:flex-row sm:gap-1
     md:flex-row lg:flex-row justify-center gap-5 
     md:gap-10 lg:gap-10 pt-10'>
     <Profilecart content={"Edit your name and your informations"} 
      header={'Edit Account'} 
      onclickfunction={()=>navigate('/profile/edit')}
      img={productuser}/>
      <Profilecart 
      onclickfunction={()=>navigate(`/${user._id}/orders`)}
      content={"Check your orders and order tracking"}
      header={"Your Orders"} img={productitem}/>
      <Profilecart 
      onclickfunction={()=>navigate(`/${user._id}/payment-options`)}
      content={"Manage and edit Your payment options"} 
      header={"Payment Options"} img={productcard}/>
     
     </div>
     <div className='flex   sm:flex-row sm:gap-1
       flex-col md:flex-row lg:flex-row 
      justify-center 
       md:gap-10 lg:gap-10
      gap-5 pt-5'>
     <Profilecart content={"Change or edit your password"} 
      header={"Login & Secuity"}
      onclickfunction={()=>navigate(`/profile/edit`)}
      img={productlock}/>
      <Profilecart content={"Your Address"}   
       onclickfunction={()=>navigate(`/profile/address`)}
      header={"Edit Delivery Address"}  img={productnavigation}/>
     <Profilecart content={"Check your favourite products"} 
      onclickfunction={()=>navigate(`/${user._id}/favourites`)}
      header={"Your Favourites"} img={productfavourite}/>
      </div>
     </div>
     <div className='flex flex-col w-full mt-5 md:mt-10 lg:mt-10  ml-2'>
    <div className='flex gap-3'>
    <FaUserCircle className='w-8 h-8'/>
    <div className='text-lg flex mt-1  font-semibold'>
      User Profile
    </div>
    </div>
    <div className='flex flex-col md:flex-row lg:flex-row justify-center 
    gap-10 ml-5 mt-5'>
    <div className='flex gap-3'>
      <FaUser className='w-6 h-6'/>
     <div className='text-md font-medium  font-baseline'>
      {user?.name}
     </div>
    </div>
    <div className='flex gap-3'>
      <FaEnvelope className='w-6 h-7'/>
     <div className='text-md font-medium font-baseline'>
      {user?.email}
     </div>
    </div>
    <div className='flex gap-3 '>
      <FaPhoneAlt className='w-5 h-6'/>
     <div className='text-md font-medium font-baseline'>
      {user?.phoneno}
     </div>
    </div>
  {
    user?.isadmin &&     
    <div className='underline hover:text-orange-400 
    cursor-pointer' 
    onClick={()=>navigate('/admin/productupload')}>
      Upload product
    </div>
  }
    </div>
    </div>
    <div>
      <div className='flex flex-col md:flex-row lg:flex-row  w-full mt-8'>
      <div className='flex md:w-[50%]
       sm:w-[50%] lg:w-[50%] w-full 
       flex-col pl-2  mt-5 '>
      <div className='flex w-full gap-3'>
       <FaMapMarkerAlt className='w-8 h-7'/>
       <div className='text-lg mt-1 font-semibold'>
        User Address
       </div>
         </div>
        <div className='flex  mt-3 gap-5 pl-5'>
         {
          user?.address?.housenumber ||
          user?.address?.nearestplace || 
          user?.address?.area ||
          user?.address?.streetname ||
          user?.address?.pincode  ? (
            <div className='flex flex-col gap-1'>
    
       
            {user?.address?.housenumber && <div className='font-md'> 
             {user.address.housenumber}
            </div> 
                    }       
                    
                    {user?.address?.streetname && 
                    <div className='font-md'> 
             {user.address.streetname}
            </div> 
                    }   
                    {user?.address?.area && 
                    <div className='font-md'> 
             {user.address.area}
            </div> 
                    }   
                    {user?.address?.pincode && 
                    <div className='font-md'> 
             {user.address.pincode}
            </div> 
                    }
             
                  {user?.address?.nearestplace && 
                  <div className='flex gap-2'>
                  <div className='text-md font-semibold'>
                  Nearest place :
                  </div>
                  <div>
                    {user?.address?.nearestplace}
                  </div>
                  </div>      
                  }   
              
                   </div> 
          ) :
          <div className='text-md font-medium  pl-5 w-full'>
              No address is found
          </div>
         }
          </div> 
         
      </div>
       

      <div className='flex border-l-2 
       border-gray-400 mt-5  flex-col md:w-[50%]
       sm:w-[50%] lg:w-[50%] w-full pl-3'>
       <div className='text-md hover:opacity-70 pb-1 border-b-2
       border-gray-300  
         font-semibold cursor-pointer'
         onClick={()=>navigate('/profile/edit')}>
        Edit Profile
        </div>    
        <div className='text-md hover:opacity-70 pb-1 border-b-2 
       border-gray-300 mt-5 font-semibold cursor-pointer'
       onClick={()=>navigate(`/profile/address`)}>
        Edit Address
        </div> 
        <div className='text-md hover:opacity-70 pb-1 border-b-2 
       border-gray-300 mt-5  font-semibold cursor-pointer'
        onClick={handledeleteaccount}
        > 
        Delete Account
        </div>    

        <div className='text-md hover:opacity-70 pb-1  
         mt-5 font-semibold text-red-400 
       cursor-pointer' 
       onClick={logoutaccount}>
        Logout
        </div>   
      </div>
      </div>
    </div>
    </div>
  )
}

export default Profile