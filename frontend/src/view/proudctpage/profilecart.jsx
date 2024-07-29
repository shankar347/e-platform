import React from 'react'
import { FaBox } from 'react-icons/fa'



const Profilecart = ({header,content,img,
  onclickfunction
}) => {
  return (
    <div className='flex mx-auto border-2 items-center
    gap-5 border-gray-300 w-64 px-2 py-2 cursor-pointer'
    onClick={onclickfunction}>
    <div className='w-[25%] flex items-center'>
       <img src={img} alt="" className='w-19 h-19'/>
    </div>
    <div className='flex w-[80%] gap-1 flex-col'>
     <div className='tex-md font-semibold'>
     {header}
     </div>
     <div className='text-sm'>
     {content}
     </div>
    </div>
    </div>
  )
}

export default Profilecart