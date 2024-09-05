import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import star from '../../assets/star.png'
import { prouductcontext } from './productcontext'
import { Avatar, Spinner, useToast } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import useratom from '../atom/useratom'
import { FaCheck, FaTicketAlt, FaTimes } from 'react-icons/fa'

const Eachproductpage = () => {

   const {productid} =useParams()
   const [product,setproduct]=useState(null)
   const [allreviews,setallreviews]=useState(null)
   const [reviewtext,setreviewtext]=useState('')
   const [editreviewtext,seteditreviewtext]=useState('')
   const [edit,setedit]=useState(false)
   const [productcolor,setproductcolor]=useState('')
  //  const [reviewcreate,setreviewcreate]=useState(false)

   console.log(product)
 
   const [loading, setLoading] =useState(false)
   const {allcartproducts,setallcartproducts} =useContext(prouductcontext)
   const [reviewloading,setreviewloading]=useState(false)
   const [productloading,setproductloading]=useState(false)


   const toast=useToast()
   const user1=useRecoilValue(useratom)
   const user=user1?.token
   const inputref=useRef(null)
   const colorsarray=product?.colors?.split(',')
    console.log(colorsarray)

  const defaultcolor=colorsarray ? colorsarray[0] : '' 
  
   const createreview=async()=>{
    try{

      if(reviewtext.length === 0)
        {
         toast({
          description:'Write your review to add',
          status:'error',
          duration:3000
         })
         return
        } 

    const res= await fetch(`/api/product/${productid}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            comment:reviewtext
        })
    })
    
    const data=await res.json()

    if(data.error)
    {
        toast({
            description:data.error,
            status:'error',
            duration:2000,
        })
        return
    }
     setallreviews(data)
     setreviewtext('')
  
    }
    catch(err)
    {
        console.log(err)
    }
   }

  
   const handleedit=(review)=>{
    setedit(true)
    seteditreviewtext(review.comment)
   }
  
   useEffect(()=>{

    if(edit && inputref.current){

    inputref.current.focus()
    let length=inputref.current.value.length
    inputref.current.setSelectionRange(length,length)
    
  } 
  },[edit])

   useEffect(()=>{
    const getallreviews=async()=>{
       try{
          setreviewloading(true)
           const res=await fetch(`/api/product/${productid}/review`)
           const data=await res.json()
           setallreviews(data)
         }  
         catch(err)
         {
           console.log(err)
         }  
         finally{
          setreviewloading(false)
         }
    }
    getallreviews()
  },[])

   const addtocart=async()=>{
    try{
      setLoading(true)
      const res= await fetch('/api/cart',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          productid:product._id,
           quantity:1,
           color:productcolor === '' ? defaultcolor : productcolor 
        })
      })
      const data=await res.json()

      if(data.error)
      {
        toast({
          description:data.error,
          status:'error',
          duration:2000,
        })
        return
      }
      toast({
        description:'Added to cart',
        status:'info',
        duration:2000,
      })
     setallcartproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

    useEffect(()=>{
    const getproduct=async()=>{

      try{
        setproductloading(true)
       const res=await fetch(`/api/product/${productid}`)
       const data=await res.json()

       setproduct(data)
      }
      catch(err)
      {
        console.log(err)
      }
      finally{
        setproductloading(false)
      }
    }
    getproduct()
   },[])
  
   const handledelete=async()=>{
    try{
      const res=await fetch (`/api/product/${productid}`,{
        method:'DELETE',
        headers:{
          'content-type':'application/json'
        }
      })
      const data=await res.json()
      if(data.error)
        {
          toast({
            description:data.error,
            status:'error',
            duration:2000,
          })
          return
        }
        setallreviews(data)
 
    }
    catch(err)
    {
      console.log(err)
    }
   }
   
  const handleeditreview=async()=>{
    try{
       const res=await fetch(`/api/product/${productid}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          comment:editreviewtext
        })
       })
       const data=await res.json()
       if(data.error)
        {
            toast({
                description:data.error,
                status:'error',
                duration:2000,
            })
            return
        }
       
        setallreviews(data)
        setedit(false)
        
    }
    catch(err)
    {
      console.log(err)
    }
  }
  
  console.log(productcolor)
  


  return (
   <>
   {
    productloading ? <div className='flex w-full
    items-center justify-center mt-5 '>
     <Spinner/>
    </div> :
     <div style={{userSelect:'none'}} className='flex 
     flex-col'>
      <div className='flex mt-5   
      md:gap-20 lg:gap-20 sm:gap-20  
       md:pl-6 lg:pl-6 pl-1 gap-2'>
      <div className='md:w-[250px] 
      lg:w-[250px] w-[200px] h-[300px] '>
       <img src={product?.image} alt='' 
       className="w-full h-full" />
      </div>
      <div className='flex flex-col'>
         <div className='md:text-4xl
         lg:text-4xl sm:text-4xl text-xl font-semibold'>
          {product?.name}
          </div> 
          <div className='flex gap-2 md:gap-5 
          lg:gap-5  sm:gap-5  mt-5'>
          <img src={star} alt=""  className={`w-4 h-4
         ${product?.likes?.length >= 1 ?  "opacity-100" : "opacity-40" }`}/>
       <img src={star} alt="" className={`w-4 h-4
         ${product?.likes?.length > 4 ?  "opacity-100" : "opacity-40" }`}/>
       <img src={star} alt="" className={`w-4 h-4
         ${product?.likes?.length > 6 ?  "opacity-100" : "opacity-40" }`}/>
       <img src={star} alt="" className={`w-4 h-4 
         ${product?.likes?.length > 8 ?  "opacity-100" : "opacity-40" }`}/>
       <img src={star} alt="" className={`w-4 h-4 
       ${product?.likes?.length > 10 ?  "opacity-100" : "opacity-40" }
       `}/>  
          </div>
          <div className='flex flex-col md:flex-row
          lg:flex-row sm:flex-row   gap-1 md:gap-5
          lg:gap-5 sm:gap-5 pt-6'>
         <div className='md:text-lg lg:text-lg text-md'>
         New Exclusive Price
         </div>
         <div className='text-red-500 text-lg'>
         ₹{product?.price}.00
         </div>
       </div>
       <div className='flex gap-2 pt-4'>
         <div className='md:text-lg lg:text-lg text-md'>
         Old Price
         </div>
         <div className='text-gray-700 line-through 
         text-lg '>
         ₹{product?.price}
         </div>
       </div>
       {
        product?.colors &&   <div className='flex gap-3 pt-1'>
        <div className='md:text-lg lg:text-lg text-md'>
         Color
        </div>
        <div className='text-gray-700
        text-md items-center '>
         {
           colorsarray?.map((color,i)=>(
              <div key={i}>
                  <input type="radio" 
                 //  checked={productcolor === color}
                  onChange={(e)=>setproductcolor(e.target.value)}  
                  value={color} name='color'/> 
                   <label className="ml-2"> 
                     {color}
                   </label>
              </div>
           ))
         }
        </div>
      </div>
       }
       <button className='bg-[rgb(244,174,44)] 
       rounded-full md:w-48 lg:w-48 sm:w-32
       w-28  py-1  ml-5
       mt-12 lg:mt-12 mt-7 md:ml-10  sm:ml-10
       lg:ml-10  md:py-2.5 lg:py-2.5 sm:py-2.5     
       text-md hover:bg-orange-300 
       focus:bg-orange-300' 
       onClick={addtocart} >
        {loading ? <Spinner h={'4'} w={'4'} /> : "Add to Cart" }   
       </button>
      </div>
     </div> 
     <div className='font-medium md:pl-10 
     lg:pl-10 sm:pl-10 pl-3
     mt-5 text-lg '>
      Descreption    
     </div>  
          <div className='text-md  md:pl-10 
     lg:pl-10 sm:pl-10 pl-3'>
           {product?.descreption}
          </div>
      
      <div className='flex flex-col 
      md:flex-row lg:flex-row w-full justify-between  mt-5'>
      <div className='flex md:ml-10
      lg:ml-10 sm:ml-10 md:ml-3 lg:ml-3 mx-2  flex-col'>
      <div className='text-lg font-semibold 
      '>
      Write your review
      </div>
       <div className='md:w-[500px] lg:w-[500px]
         w-[100%] mt-3 border-2
       border-gray-500 rounded-md    '>
       <textarea 
       value={reviewtext}
       onChange={(e)=>setreviewtext(e.target.value)}
       className='w-full pl-1 outline-none h-full transparent resize-none rounded-md
       '>
       </textarea>
       </div>
       <div className='w-full flex  justify-end'>
        <button className='w-32 h-10 
        cursor-pointer
        hover:bg-teal-300
        focus:bg-teal-300 rounded
         bg-teal-400 mt-0.5  '
         onClick={createreview}
         >
         Create
        </button>   
       </div>
      </div>
      <div>
      <div className='flex flex-col md:mr-10
      lg:mr-10 mr-0 sm:ml-10 sm:mr-2  '>
       <div className='text-lg font-medium 
       px-0'>
       Reviews ({allreviews?.length})  
       </div>
       <div className='flex flex-col mt-2 
       overflow-x-hidden overflow-y-scroll 
       md:w-[600px]
       my-2 
       lg:w-[600px] w-[100%] h-[200px] 
       md:border-2 md:border-gray-500
        lg:border-2 lg:border-gray-500
        sm:border-2 sm:border-gray-500
        border-2 border-transparent
        '>
       
        {
         !reviewloading &&  allreviews?.length !==0 ?  
        allreviews?.map((review)=>(
             <div className='flex flex-col my-2 
             border-b-2 py-1  mx-auto 
             hover:opacity-70 focus:opacity-70
              border-gray-300 reviewmodel w-[95%]
             '>
             <div className='flex justify-between'>
               <div className='gap-2  flex '>
                <Avatar width={7}  h={7} 
                name={review?.name}/> 
               <div className='text-md    '>
                  {review?.name}
               </div>
               </div> 
             </div>
            {
             !edit ?
             <div className='text-md ml-2 my-2 
              font-medium h-7'>
             {review?.comment}
            </div> : 
             <div className='flex py-2 ml-2 
             font-medium'>
             <div className='w-[100%] h-7'>
             <textarea value={editreviewtext} 
             ref={inputref}
             onChange={(e)=>seteditreviewtext(e.target.value)} 
             className='w-full pl-0 h-full outline-none  
             transparent resize-none rounded-md'>
             </textarea>
            </div> 
            </div> 
            }
              {
                !edit  ? review.user === user._id && (
                 <div className='flex justify-between'>
                  <div className='text-md  
                  font-medium text-blue-500
                   cursor-pointer'
                  onClick={()=>handleedit(review)}>
                     Edit
                  </div>
                  <div className='text-md  
                  font-medium text-red-500
                   cursor-pointer'
                  onClick={handledelete}
                  >
                     Delete
                  </div>
                 </div>
                    ) : (
                     <div className='flex 
                   justify-end  width-full'>
                     <div className='flex gap-3'>
                         <FaTimes 
                         onClick={()=>setedit(false)}
                         className='text-red-500
                         cursor-pointer'/>
                        <FaCheck
                        onClick={handleeditreview}
                        className='text-green-500
                         cursor-pointer'/>
                       </div>  
                     </div>
                    )  
              }
             </div>
         )) :  
         <div className='flex h-full flex-row
         justify-center items-center'>
        <div className='text-md  
        font-medium'>
        No reviews yet
        </div>
         </div>
        }
    
    {
     reviewloading && 
     <div className='flex items-center justify-center
     h-full'>
     <Spinner/>
     </div>
    }
 
    
    
 
 
       </div>  
      </div>
      </div>
      </div>
 
     </div>
   }
   </>
  )
}

export default Eachproductpage