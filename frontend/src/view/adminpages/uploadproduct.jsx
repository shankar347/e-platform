import React, { useContext, useEffect, useRef, useState } from 'react'
import Hanleimage from '../hooks/handleimagechange'
import { CloseButton, Spinner, useToast } from '@chakra-ui/react'
import { prouductcontext } from '../proudctpage/productcontext'

const Uploadproduct = () => {

  const imageref=useRef(null)
  const {imageurl,setimageurl,iamagechange} =Hanleimage()
  const [loading,setloading]=useState(false)
  const [name,setname]=useState('')
  const [descreption,setdescription]=useState('')
  const [price,setprice]=useState('')
  // console.log(imageurl)
  // console.log(name)
  // console.log(price)

  const {allproducts,setallproducts}=useContext(prouductcontext)
  console.log(allproducts)

  const toast=useToast()

  useEffect(()=>{
  
    const getallproducts=async()=>{
      try
      {
        const res=await fetch('/api/product')
        const data=await res.json()
        setallproducts(data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getallproducts()
  },[imageurl])
  

  const handlecreateproduct=async()=>{
    try
    {
      if(!name || !price  || !imageurl)
      {
        toast({
          description:'Provide all the fields to upload',
          status:'error',
          duration:3000
        })
        return
      }


       setloading(true)
       const res=await fetch(`/api/product`,{
        method:'POST',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify({
          name:name,
          price:price,
          imageurl:imageurl,
          descreption:descreption
        })
       })
       const data=await res.json()

       if(data.error)
       {
        toast({
          title:data.error,
          status:'error',
          duration:3000,
        })
        return
       }
       toast({
        description:'Product Uploaded successfully',
        status:'success',
        duration:3000
       })
       setimageurl(null)
       setname('')
       setprice('')
       setdescription('')
       setallproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setloading(false)
    }
  }


  return (
    <div className='flex flex-col mx-5 max-w-md lg:mx-auto
    sm:mx-auto md:mx-auto 
      '
      style={{userSelect:'none'}}>
     <div className='text-lg text-red-400 font-medium mt-10 
     text-center mb-4'>
      Upload Product
     </div>
     <div className='flex flex-col  w-full'>
      <div className='text-md font-medium'>
        Name
      </div>
      <input type="text" className='w-full pl-2 
      ml-0 border-2 mt-1
      border-blue-400 rounded h-8' 
      value={name}
      onChange={(e)=>setname(e.target.value)}/>
     </div>
     <div className='flex flex-col mt-5  w-full'>
      <div className='text-md font-medium'>
        Price
      </div>
      <input type="text" className='w-full pl-2 
      ml-0 border-2 mt-1
      border-blue-400 rounded h-8'
      value={price}
      onChange={(e)=>setprice(e.target.value)} />
     </div>
     <div className='flex flex-col mt-5  w-full'>
      <div className='text-md font-medium '>
        Descreption
      </div>
      <div className='w-full h-15'>
      <textarea  className='w-full h-full pl-2 
      ml-0 border-2 mt-1
      border-blue-400 rounded  outline-none  
            transparent resize-none rounded-md'
      value={descreption}
      onChange={(e)=>setdescription(e.target.value)} >
      </textarea>
      </div>
     </div>
     <div className='flex  justify-start relative mt-5 flex-col'>
    {
      !imageurl &&     <button 
      onClick={()=>imageref.current.click()}
      className='w-28 h-10
       rounded text-sm cursor-pointer
       hover:bg-orange-300
       focus:bg-orange-300
      bg-[rgb(244,174,44)]'>Upload Image</button>
    }
        <input type="file" className='hidden' 
        ref={imageref}  onChange={iamagechange} />
       {
        imageurl && (
          <div className='w-60 ml-3'>
          <img src={imageurl}  className='w-full' 
          alt="" />
          </div>
        )
       }
      {
        imageurl && (
          <div  
          onClick={()=>setimageurl(null)}
          className='bg-[rgb(244,174,44)] 
          hover:bg-[rgb(244,174,44)] w-5 h-5
          absolute top-1 md:left-1/2 lg:left-1/2 
          right-20 rounded flex justify-center items-center '>
          <CloseButton className='w-5 h-5'/>        
               </div>
        )
      }
     </div>
     <div className='flex justify-center'>
     <button 
     onClick={handlecreateproduct}
     className='w-32 bg-red-400 h-10 
     hover:bg-red-300 focus:bg-red-300
     rounded-full text-white cursor-pointer md:mt-10
     lg:mt-10 sm:mt-10 mt-5 mb-2 text-center'>
      {loading ? <Spinner/> : "Create"}
     </button>
     </div>
    </div>
  )
}

export default Uploadproduct