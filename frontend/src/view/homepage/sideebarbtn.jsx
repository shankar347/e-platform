import React from 'react'

const Sideebarbtn = ({onclickfunction,name}) => {
  return (
    <button onClick={onclickfunction} 
   className='sidebarbtn'>
       {name}
    </button>
  )
}

export default Sideebarbtn