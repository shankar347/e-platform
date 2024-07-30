import React, { useState } from 'react'
import { constSelector, useRecoilState } from 'recoil'
import authatom from '../atom/loginatom'
import {FaEnvelope, FaLock, FaMailBulk,
   FaMailchimp, FaPhone, FaPhoneAlt, FaUser} from 'react-icons/fa'
import {CgMail} from 'react-icons/cg'
import useratom from '../atom/useratom'
import { Spinner, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Register = () => {


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
     

    const toast=useToast()
    const navigate=useNavigate()

    const Registersubmit=async(e)=>{
      e.preventDefault()
        try
        {
          if(!name || !email || !password || !number)
          {
           toast({
            description:"Fill all the details",
            status:'error'
           }) 
           return;
          }

          setloading(true)
          const res=await fetch('/api/user/register',{
            method:'POST',
          headers:{
            'content-Type':'application/json'
          },
          body:JSON.stringify({
            name,
            email,
            password,
            phoneno:number
          })
          })

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
              description:"Registered successfully",
              status:'success',
              duration:5000
            })
           navigate('/profile/address') 
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
    <div className="bg-[rgba(255,191,0,0.749)]
     h-screen " style={{userSelect:'none'}} >
        <form action=""  
        //  onSubmit={Registersubmit}  
       className='pt-20 max-w-md mx-auto px-5 w-full'>
           <h1 className='font-sans-serif text-2xl 
           text-800   font-semibold
           text-center text-primary text-red-500'> Sign Up
           </h1>
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
           <input placeholder='Enter UPI number'
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
                      <button
                      onClick={Registersubmit}
                      className='w-32 rounded-full h-12 
                      mx-auto bg-red-500 hover:bg-red-400 
                      focus:bg-red-400 text-sm mt-5 text-white
                      '>
                {loading ? <Spinner w={'5'} h={'5'} />
                 : 'Register'}
             </button>
             <div className='pt-2  flex 
             gap-2 justify-center '>
                Already have an account 
             {/* <Link  to={'/login'} 
             className="text-blue-600 underline">
               Login
             </Link> */}
             <div onClick={()=>setauth('login') } 
                className="text-blue-600  
                cursor-pointer 
                focus:text-blue-400 
                hover:text-blue-400">
              Login
             </div>
             </div>
           </div>
       </form>
    </div>
  )
}

export default Register