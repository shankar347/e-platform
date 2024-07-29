import React, { useEffect, useState } from 'react'
import authatom from '../atom/loginatom'
import useratom from '../atom/useratom'
import { Spinner, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useRecoilState } from 'recoil'

const Profileupdate = () => {
  
  const [name,setname]=useState('')
  const [password,setpassword]=useState('')
  const [email,setemail]=useState('')
  const [number,setnumber]=useState('')
 
  const [auth,setauth]=useRecoilState(authatom)
  const [isfocused,setisfocused]=useState(false)
  const [isfocused1,setisfocused1]=useState(false)
  const [isfocused2,setisfocused2]=useState(false)
  const [isfocused3,setisfocused3]=useState(false)

  const handlefocus=()=>setisfocused(true)
  const handleblur=()=>setisfocused(false)

  const handlefocus1=()=>setisfocused1(true)
  const handleblur1=()=>setisfocused1(false)
  
  const handlefocus2=()=>setisfocused2(true)
  const handleblur2=()=>setisfocused2(false)
  
  const handlefocus3=()=>setisfocused3(true)
  const handleblur3=()=>setisfocused3(false)
  
  const [user,setuser]=useRecoilState(useratom)
  const [loading,setloading]=useState(false)
  console.log(user)
  const toast=useToast()
  const navigate=useNavigate()
  
  
  useEffect(()=>{
    if(user?.name)
    {
      setname(user?.name)
    }
    if(user?.email)
    {
      setemail(user?.email)
    }
    if(user?.phoneno)
    {
      setnumber(user?.phoneno)
    }
  },[])


  const handleupdateuser=async(e)=>{
    e.preventDefault()
    try
   {
   
    if(!name && !email && !password && !number)
      {
       toast({
        description:"Provide atleast one field to update",
        status:'error'
       }) 
       return;
      }

   
    
   

    setloading(true)
     const res=await fetch(`/api/user/profile/${user._id}`,{
      method:'PUT',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        password,
        email,
        number
      })
     })
     const data=await res.json()
     console.log(data)
     if(data.error)
     {
      toast({
        description:data.error,
        duration:3000,
        status:'error'
      })
      return
     }
     toast({
      description:'Profile updated sucessfully',
      duration:3000,
      status:'success'
     })
     navigate('/profile')
     setuser(data)
     localStorage.setItem('token',JSON.stringify(data))
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
    <div 
    style={{userSelect:'none'}} className='bg-[rgba(255,191,0,0.749)] 
     h-screen mx-auto'>
      <div className='max-w-md mx-auto pt-30 px-5 
      w-full'>
       <h1 className='text-2xl  
        pt-10 font-sans-serif
       text-800 font-semibold
       text-center text-red-500'>
        Update Profile</h1> 
        <div className='flex flex-col '>
           <div className={` ${isfocused ? 'border-2 border-blue-400'
        : 'border border-transparent'
        } mx-0 mt-7 h-10  bg-white
              flex 
            justify-center items-center rounded`}>
           <FaUser className=' ml-1'/>
           <input placeholder='Enter name ' 
           value={name}
           onFocus={handlefocus}
           onBlur={handleblur}
           onChange={(e)=>setname(e.target.value)}
           className='w-full h-9 px-2 
           bg-transparent outline-none' 
            type="text" />
             </div>
             <div className={`mx-0 mt-7 h-10  bg-white
              rounded-200 flex 
               ${isfocused1 ? 'border-2 border-blue-400'
        : 'border border-transparent'
        } 
            justify-center items-center rounded`}> 
           <FaEnvelope className='ml-1'/>    
           <input placeholder='Enter emailid'
           value={email}
           onFocus={handlefocus1}
           onBlur={handleblur1}
           onChange={(e)=>setemail(e.target.value)}
           className='w-full h-9 px-2 
         outline-none  bg-transparent' 
            type="email" />
          </div>
          <div className={`mx-0 mt-7 h-10 outline-none bg-white
            rounded-200 flex 
              ${isfocused2 ? 'border-2 border-blue-400'
        : 'border border-transparent'
        }
            justify-center items-center rounded`}>
            <FaPhoneAlt className='ml-1'/>   
           <input placeholder='Enter number'
           value={number}
           onFocus={handlefocus2}
           onBlur={handleblur2}
           onChange={(e)=>setnumber(e.target.value)}
           className='w-full h-9 px-2 
           bg-transparent outline-none' 
            type="text" />
        </div>
        
        <div className={  `mx-0 mt-7 h-9 outline-none bg-white
           rounded-200 flex 
            ${isfocused3 ? 'border-2 border-blue-400'
        : 'border border-transparent'
        }
            justify-center items-center rounded`}>
           <FaLock className='ml-1'/>
           <input type="password" 
            value={password}
            onFocus={handlefocus3}
            onBlur={handleblur3}
            onChange={(e)=>setpassword(e.target.value)}
           placeholder='Enter password'
           className='w-full h-10 px-2 
           bg-transparent outline-none' 
           name="" id="" />
           </div>

              <div className='flex 
              mt-5 justify-around'>
              <button
                onClick={()=>navigate('/profile')}
                 className='bg-red-500
                 py-2  text-white rounded-full
              mx-auto flex justify-center
              bg-red-500 cursor-pointer 
               hover:bg-red-400 w-28  
             my-2  '>Cancel</button>
              <button
                      onClick={handleupdateuser}
                      className='bg-red-500
                      py-2  cursor-pointer
                       text-white rounded-full
                   mx-auto flex justify-center
                   bg-red-500
                    hover:bg-red-400 w-28  
                  my-2    
                      ' >
             {loading ? <Spinner/> : 'Update'}
              </button>    
              </div>
           </div>
      </div>
    </div>
  )
}

export default Profileupdate