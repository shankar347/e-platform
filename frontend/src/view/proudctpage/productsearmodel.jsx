import React, { useContext } from 'react'
import { prouductcontext } from './productcontext'
import { CloseButton } from '@chakra-ui/react'
import Productmodelinfo from './productmodelinfo'

const Productsearchmodel = () => {
   
 
    const {searchproduct,setsearchproduct,allproducts,
      searchtext,setsearchtext,
      allsiteproducts,setallsiteproducts
    }=useContext(prouductcontext)
    // console.log(searchtext)
    // console.log(allsiteproducts)
    console.log(allsiteproducts)
    const filteredproducts=allsiteproducts?.filter((product)=>(
      product.name.toLowerCase().includes(searchtext.toLowerCase())
    ))
     
    
   console.log(filteredproducts)
  


  return (
   <div className='flex flex-col
    relative w-full '>
   { searchproduct &&  <div 
    style={{userSelect:'none'}} className='
    absolute top-5 md:w-[50%] 
    lg:w-[50%] w-[99%] transform 
    -translate-x-1/2 left-1/2 
    searchmodel z-[9999]
     bg-white md:h-[80vh] lg:h-[80vh] h-[88vh] 
     sm:h-[80vh]'>  
    <div className='flex flex-col  mb-5 '>
    <div className='flex flex-col relative items-center'>   
     <div className='text-lg font-medium text-center
     '>
     Searched Products
     </div>
     <div className='w-20 rounded-full h-1 bg-[rgb(244,174,44)]'>
       </div>
      <CloseButton 
      onClick={()=>setsearchproduct(false)} className='hover:bg-[rgb(244,174,44)] 
      absolute right-0 bottom-0'/> 
     </div>
    </div>
   <div className='overflow-y-scroll  h-[90%]'>
 {
 filteredproducts?.map((product)=>(
    <Productmodelinfo product={product}
    key={product._id}/>
  ))
 }
   </div>
    </div>
}</div>
  )
}

export default Productsearchmodel