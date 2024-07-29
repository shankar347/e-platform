import React from 'react'
import { AiFillQqSquare } from 'react-icons/ai'
import { FaGooglePay, FaMoneyBillWave, FaPhone } from 'react-icons/fa'

const Paymentoptionpage = () => {


    const qrlogo="https://tse2.mm.bing.net/th?id=OIP.L4DHoTMi5WQI5_9xX4vN0wHaHY&pid=Api&P=0&h=180" || <AiFillQqSquare 
  className='w-8 h-8'/>

  const gpaylogo="https://tse3.mm.bing.net/th?id=OIP.topY-ldmsiYwcpEA8jTKQwHaHa&pid=Api&P=0&h=180" || 
  <FaGooglePay className='w-8 h-8'/> 
 
  const phonepaylogo="https://tse1.mm.bing.net/th?id=OIP.Yobol-DtbP0LEyrFnSYw6gHaHa&pid=Api&P=0&h=180" || 
 <FaPhone  className='w-8 h-8'/>

 const paytmlogo="https://tse1.mm.bing.net/th?id=OIP.s12ZyNyYcclD5anlTcrI4gHaHk&pid=Api&P=0&h=180 " || <FaMoneyBillWave
 className='w-8 h-8'/>

  return (
    <div  style={{userSelect:'none'}} className='flex flex-col 
    ml-4 mt-4'>
  <div className='text-md font-medium'>
        Accepted payment options
     </div>
    <div 
   
    className='flex flex-col 
    items-center gap-3
    justify-center w-full h-screen'>
       
   
       <button
    //   onClick={()=>handlepayment("Gpay")}
      className={`flex items-center  cursor-pointer
      bg-white border border-gray-300 shadow-md 
      rounded-lg h-12 gap-2 w-60   hover:shadow-lg 
      transition-all duration-300 
    `}
    //   disabled={!ismobile} 
    >
     <img
  src={gpaylogo}
  alt="Gpay"
  className="w-12 h-12 mr-1"
/>
   
      <span className="text-gray-800 font-semibold">Pay with Google Pay</span>
    </button> 
    <button
    //   onClick={()=>handlepayment("phonepay")}
      className={`flex items-center 
      bg-white border border-gray-300 shadow-md 
      rounded-lg  h-12  gap-4   w-60 
       hover:shadow-lg  cursor-pointer 
      transition-all duration-300
`}
    >
     <img
  src={phonepaylogo}
  alt="phonepay"
  className="w-8 h-8  mr-1 ml-2"
/>
   
      <span className="text-gray-800 font-semibold">Pay with Phone Pay</span>
    </button> 
    <button
    //   onClick={()=>handlepayment("paytm")}
      className={`flex items-center 
      bg-white border border-gray-300 shadow-md 
      rounded-lg  h-12  gap-4   w-60 
       hover:shadow-lg cursor-pointer
    `}
    // disabled={!ismobile} 
    >
     <img
  src={paytmlogo}
  alt="paytm"
  className="w-8 h-8  mr-1 ml-2"
/>
   
      <span className="text-gray-800 font-semibold">
        Pay with Paytm</span>
    </button>

    <button 
    // onCanPlay={handlegenerateqr}
    className="flex items-center 
    bg-white border border-gray-300 shadow-md 
    rounded-lg  h-12  gap-4   w-60 
     hover:shadow-lg  cursor-pointer
    transition-all duration-300"
    >
           <img
  src={qrlogo}
  alt="qr"
  className="w-8 h-8  mr-1 ml-2"
/>
      <span 
    //   onClick={handlegenerateqr}
      className="text-gray-800 ml-4 font-semibold">
      Generate Qr</span>
    </button>
      
      {/* {
        qrcode && (
          <div className="flex flex-col gap-5 justify-center items-center  w-screen ">
             <QRCodeCanvas value={qrcode}/>
             <div className='text-md font-medium'>
              Scan qr to complete payment
             </div>
          </div>
        )
      } */}

    </div>
    </div>
  )
}

export default Paymentoptionpage