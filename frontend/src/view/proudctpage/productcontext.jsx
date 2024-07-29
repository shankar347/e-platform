
import React, { createContext, useEffect, useState } from 'react'
import { useFetcher } from 'react-router-dom'


export const prouductcontext=createContext()

const Productcontext = ({children}) => {
  
 
const [searchproduct,setsearchproduct]=useState(false)
const [allproducts,setallproducts]=useState(null)
const [allsiteproducts,setallsiteproducts]=useState(null)
const [allcartproducts,setallcartproducts]=useState(null)
const [cartloading,setcartloading]=useState(false)  
const [searchtext,setsearchtext]=useState('')
const [favourite,setfavoutie]=useState(null)
const [orders,setorders]=useState(null) 
const [totalamount,settotalamount]=useState(0)
const [selected,setselected]=useState([])
const [adminorders,setadminorders]=useState(null)
console.log(allsiteproducts)  
useEffect(()=>{

  const getallproducts=async()=>{
    try
    {
     const res=await fetch('/api/product')
     const data=await res.json()
     setallsiteproducts(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
 getallproducts()

},[])

  return (
    <prouductcontext.Provider 
    value={{searchproduct,setsearchproduct,
      allproducts,setallproducts,
      allcartproducts,setallcartproducts,
      cartloading,setcartloading,
      searchtext,setsearchtext,
      allsiteproducts,setallsiteproducts,
      favourite,setfavoutie,
      orders,setorders,
      totalamount,settotalamount,
      selected,setselected,
      adminorders,setadminorders
    }} >
       {children}
    </prouductcontext.Provider>
  )
}

export default Productcontext