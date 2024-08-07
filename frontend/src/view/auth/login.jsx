import React, { useRef, useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import authatom from '../atom/loginatom'
import useratom from '../atom/useratom'
import {Spinner, useToast} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

   

  const toast=useToast()
    
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  
  const [isfocused,setisfocused]=useState(false)
  const [isfocused1,setisfocused1]=useState(false)

  const handlefocus=()=>setisfocused(true)
  const handleblur=()=>setisfocused(false)

  const handlefocus1=()=>setisfocused1(true)
  const handleblur1=()=>setisfocused1(false)
   
  const [authstate,setauth]=useRecoilState(authatom)
  const [user,setuser]=useRecoilState(useratom)
  const [loading,setloading]=useState(false)

  const navigate=useNavigate()
 
  const handlelogin=async(e)=>{
    e.preventDefault()
    try{
   if(!email || !password)
   {
    toast({
      title:'Please fill all the fields',
      status:'error'
    })
    return
   }

      setloading(true)
      const res=await fetch('/api/user/login',{
        method:'POST',
        headers:{
         'content-Type':'application/json'
        },
        body:JSON.stringify({
          email,
          password
        })      
      }
      
     )
     const data=await res.json()
     if(data.error)
     {
      toast({
        description:data.error,
        status:'error',
        duration:5000
      })
      return
     }
     toast({
      description:"Logged in successfully",
      status:'success',
      duration:5000
    })
     navigate('/')
    console.log(data)
  
    
     var token=JSON.stringify({
      token:data,
      expiresAt:new Date().getTime() +  2 * 24 * 60 * 60 * 1000 
    })
     setuser(JSON.parse(token))  
     localStorage.setItem('token',token)
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
    <div style={{userSelect:'none'}} 
     className='bg-[rgba(255,191,0,0.749)] h-screen 
    '> 
      <form action="" onSubmit={handlelogin} 
      className='pt-20 max-w-md mx-auto px-5 w-full'>
        <h1 style={{userSelect:'none'}} 
        className='text-2xl font-semibold 
        text-red-500 text-center text-primary mb-20'>
          Login
        </h1>
       
       <div className={`w-full  
        h-10 bg-white  flex mb-10 ${isfocused ? 'border-2 border-blue-400'
        : 'border border-transparent'
        }
       rounded rounded-200 items-center justify-center`}>
       <FaEnvelope className='ml-1'/>    
           <input placeholder='Enter emailid'
           value={email}
           onFocus={handlefocus}
           onBlur={handleblur}
           onChange={(e)=>setemail(e.target.value)}
           className='w-full h-9 px-2 
         outline-none  bg-transparent' 
            type="email" />
       </div>
       
       <div className={`w-full h-10 bg-white
       rounded rounded-200 flex mb-10
       justify-center items-center ${isfocused1 ? 'border-2 border-blue-400'
        : 'border border-transparent'
        }`}>
       <FaLock className='ml-1'/>
           <input type="password" 
            value={password}
            onFocus={handlefocus1}
           onBlur={handleblur1}
            onChange={(e)=>setpassword(e.target.value)}
           placeholder='Enter password'
           className='w-full h-10 px-2 
           bg-transparent outline-none' 
           name="" id="" />
       </div>
      
      <button type='submit' className='w-32 mt-9 py-2 text-white
       bg-red-500 hover:bg-red-400
        rounded-full mx-auto block
        focus:bg-red-400' >
        {loading ? <Spinner w={'5'} h={'5'}/> : "Login"}
      </button>
      <div className='flex gap-1 mt-5 w-full items-center justify-center' >
        <p>Don't have an account</p>
        <p className='text-blue-600 hover:text-blue-400 
        cursor-pointer focus:text-blue-400' 
        onClick={()=>setauth('register')}> Register</p>
      </div>
      
      </form>  
    </div>
  )
}

export default Login