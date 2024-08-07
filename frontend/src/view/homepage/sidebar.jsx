import React, { useContext } from 'react'
import {useRecoilValue} from 'recoil'
import useratom from '../atom/useratom'
import {Avatar} from '@chakra-ui/react'
import Sideebarbtn from './sideebarbtn'
import Imageslider from './imageslider'
import { FaShoePrints } from 'react-icons/fa'
import { GiRunningShoe } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { prouductcontext } from '../proudctpage/productcontext'
import logo from '../../assets/cartlogo.png'

const Sidebar = () => {
 
  const navigate=useNavigate()
  const user1=useRecoilValue(useratom)
  const user=user1?.token 

    const {allsiteproducts,setallsiteproducts}=useContext(prouductcontext)


    const getrandomproductsid=()=>{
     
      if(allsiteproducts?.length === 0)
     {
      return null
     }

     const randomindex=Math.floor(Math.random() *
     allsiteproducts?.length)

    return allsiteproducts ? allsiteproducts[randomindex]?._id : '' 
    
    }
  
    const randomindex1=Math.floor(Math.random() *
     allsiteproducts?.length)


    const randomproductid=getrandomproductsid()

    
    const randomvalues= allsiteproducts ?  allsiteproducts[randomindex1]?.image : ''
    const randomimage=randomvalues
    

  return (
    <div 
    style={{userSelect:'none'}}
     className='pl-0 flex flex-col'>
     <div className='flex pl-2 pt-2 gap-3'>
           <Avatar name={user?.name} 
           src={user?.profilepic} w={'7'} h={'7'} />
       <div>{user?.name}</div>    
    </div>
    <div  className='text-xl pt-5 pl-3 font-sansserif font-semibold'>
     Hello  {user?.name}
    </div>
    <div className='text-lg pt-1 pl-3'>
      Welcome to sravcart
    </div>
    <div className='flex flex-wrap pt-5' 
    > 
    <Sideebarbtn name={'Your Account'} 
    onclickfunction={()=>navigate('/profile')}/> 
    <Sideebarbtn name={'Your Orders'} 
    onclickfunction={()=>navigate(`/${user._id}/orders`)}/> 
    <Sideebarbtn name={'For you'}  
    onclickfunction={()=>navigate(`/${user._id}/${randomproductid}`)} /> 
    <Sideebarbtn name={'Favourites'}
    onclickfunction={()=>
    navigate(`/${user._id}/favourites`)}/> 

    </div>
   { allsiteproducts && allsiteproducts.length !==0 && 
   <Imageslider />}   
    <div className='absolute flex gap-3 items-center
     left-1/2 transform -translate-x-1/2 bottom-2'>
     <img src={logo} 
     className='w-7 h-7 rounded' />
    <div className='text-lg font-poppins font-semibold'>
     sravcart
    </div>
    </div>
    </div>
  )
}

export default Sidebar