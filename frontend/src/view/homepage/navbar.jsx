import React, { useContext } from 'react'
import { CgHome, CgShoppingCart } from 'react-icons/cg'
import { FaCaretUp, FaCartArrowDown, FaCartPlus, FaHome, FaHouseUser, FaRegUser, FaSearch } from 'react-icons/fa'
import { GiRunningShoe } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { prouductcontext } from '../proudctpage/productcontext'

const Navbar = () => {

  const navigate=useNavigate()
  const user=useRecoilValue(useratom)
  const {searchproduct,setsearchproduct,
    searchtext,setsearchtext
  } =useContext(prouductcontext)
  
 
  return (
    <div className='w-[100%] h-10 flex items-center
     bg-[rgb(244,174,44)]  navbar  ' style={{userSelect:'none'}}>
     <div className='flex  md:gap-3 lg:gap-3 sm:gap-3
     gap-1   md:pl-5
     lg:pl-5 sm:pl-5 pl-2'>
     <GiRunningShoe className="w-8 h-8"/>
     <p className='font-poppins sm:text-xl  lg:text-xl 
     md:text-xl  text-md mt-1 hidden  
     md:block lg:block' >Get-Foot</p>
     </div>
     <div className='flex flex-1 justify-around   '>
      <div className='bg-white rounded-full h-7 
      md:w-[350px] pl-2
      lg:w-[640px] flex items-center sm:w-[400px] w-[210px]'>
       <FaSearch/>
       <input type="text" 
       value={searchtext}
       onChange={(e)=>setsearchtext(e.target.value)}
       onClick={()=>setsearchproduct(true)}
       className='w-[95%] pl-2 bg-transparent
       text-black outline-none text-md  ' 
       placeholder='search your product'/>
      </div>
       <div className='flex md:gap-7 lg:gap-7 sm:gap-5 gap-2    items-center mr-0 '>
       <CgShoppingCart 
       onClick={()=>navigate(`${user._id}/cart`)}
       className="w-7 h-7 cursor-pointer"/>
        
            <FaRegUser 
            onClick={()=>navigate('/profile')} 
            className="w-5 h-5 cursor-pointer"/>
           <FaHome  onClick={()=>navigate('/')} 
            className="w-6 h-6 cursor-pointer"/> 
       </div>
      </div>
    </div>
  )
}

export default Navbar