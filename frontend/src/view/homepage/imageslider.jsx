import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { prouductcontext } from '../proudctpage/productcontext'


const Imageslider = () => {
  
  const {allsiteproducts,setallsiteproducts}=useContext(prouductcontext)
  const [images,setimages]=useState([]) 
  const [storyindex,setstoryindex]=useState(0)
  // console.log(images)
  
  const getrandomimage=()=>{
    if(allsiteproducts && allsiteproducts.length >0 )
    {
    
      const inexarray=[]
      var maxlength=5
   
      while (inexarray.length < maxlength )
      {
        const randomindex=Math.floor(Math.random() * allsiteproducts?.length)
        if(!inexarray.includes(randomindex))
        {
          inexarray.push(randomindex)
        }
      }
     
    return  inexarray.map((index)=>allsiteproducts[index].image)
    }
    return []
  }

  useEffect(()=>{
   const images1=getrandomimage()
    setimages(images1)
  },[allsiteproducts])

    
  
   
  //  console.log(images)

   useEffect(()=>{
   
    const interval=setInterval(()=>{
      setstoryindex((previndex)=>(
        previndex === images.length - 1 ? 0 : previndex +1
      ))
    },2000)
 
    return ()=>clearInterval(interval)  
   },[images.length])

  return (
    <div className='relative w-[100%] mx-auto mt-8
     h-64 overflow-hidden'>
    <div className='w-full flex 
     transition-transform 
    duration-500  h-[90%]   '  
    style={{transform:`translateX(-${storyindex*100}%)`}}>
  {
   images?.map((img,index)=>(
    <img src={img} at="img"
     key={index} 
    alt={`Slide ${index}`}    
     style={{
      flexShrink:0,
        height:'100%',
        width:'100%',
         objectFit:'cover'
     }}
    className='object-cover w-full h-full' />
   ))
  }

    </div>
       <div className='absolute flex bottom-7 
       left-1/2 transform
       -translate-x-1/2'>
       {
        images?.map((img,index)=>(
          <Box key={index} 
          w={'8px'}
          onClick={()=>setstoryindex(index)}
          bottom={0}
          left={0}
          h={'8px'}
          cursor={'pointer'}
          borderRadius={'50%'}
          ml={'5px'}
          border={'2px solid '}
          borderColor={'gray.300'}
          bg={ `${storyindex === index ?  "blue.500" :'white'}`}>
          </Box>
        ))
       }
       </div>
      
 
    </div>
    
  )
}

export default Imageslider