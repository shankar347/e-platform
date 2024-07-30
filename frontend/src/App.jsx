import { Navigate, Route, Router, Routes, useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

import Auth from "./view/auth/auth"
import useratom from "./view/atom/useratom"
import Profile from "./view/user/profile"
import Profileaddress from "./view/user/profileaddress"
import Profileupdate from "./view/user/profileupdate"
import Mainpage from "./view/homepage/mainpage"
import Navbar from "./view/homepage/navbar"
import Sidebar from "./view/homepage/sidebar"
import Cartpage from "./view/proudctpage/cartpage"
import { prouductcontext } from "./view/proudctpage/productcontext"
import Productsearchmodel from "./view/proudctpage/productsearmodel"
import Favourtepage from "./view/proudctpage/favouritepage"
import Orderpage from "./view/proudctpage/orderpage"
import Paymentoptionspage from "./view/proudctpage/paymentoptionspage"
import Uploadproduct from "./view/adminpages/uploadproduct"
import Eachproductpage from "./view/proudctpage/eachproductpage"
import Ordercreate from "./view/proudctpage/ordercreate"
import Adminorderpage from "./view/adminpages/adminorderpage"
import Paymentoptionpage from "./view/proudctpage/paymentoptionpage"


function App() {
   

  const user=useRecoilValue(useratom)
  const location=useLocation()

  const authpath=location.pathname === '/auth'
  const checkprofile=location.pathname ===  '/profile/address'

  

  return (
    <>
{ !authpath && !checkprofile ?
  <div className='w-[15%] hidden sm:hidden
          md:block lg:block h-screen fixed bg-[rgba(255,191,0,0.749)]
          '>
    <Sidebar/> 
  </div> : ''
}
   <div className={`flex flex-col ml-[0%] sm:ml-[0%] 
        sm:w-[100%]  w-[100%]
       ${!authpath  && !checkprofile? 
       "md:ml-[15%] lg:ml-[15%]  md:w-[85%] lg:w-[85%]" 
       : "md:w-[100%] lg:w-[100%]" }`}>
          {!authpath  && !checkprofile ?  <Navbar/>  : ''}

      
<div className="relative" >
  {user &&  <Productsearchmodel/> }
    <Routes>
      <Route path="/auth" element={<Auth/>} />
       <Route path="/" element={user ? <Mainpage/> : <Navigate to={'/auth'}/> }/>
       <Route path="/profile" element={user ? <Profile/> : <Navigate to={'/auth'}/>} /> 
       <Route path="/profile/address" element={user ? <Profileaddress/>: <Navigate to={'/auth'}/>}/>
       <Route path="/profile/edit" element={user?  <Profileupdate/> : <Navigate to={'/auth'}/>} />  
      <Route path="/:id/cart" element={user ? <Cartpage/> : 
      <Navigate to={'/auth'}/>} />
      <Route path="/:id/favourites" 
      element={user ?  <Favourtepage/> : <Navigate 
      to={'/auth'}/>}/>
      <Route path="/:id/orders" 
      element={user ? <Orderpage/> : <Navigate to={'/auth'}/>}/>
       <Route path="/:id/paymentoptions" 
      element={user ? <Paymentoptionspage/>  : <Navigate to={'/auth'}/>}/>
       <Route  />
       <Route path="/:id/payment-option"  
        element={user ? <Paymentoptionpage/>  : <Navigate to={'/auth'}/>}/>
      <Route path="/admin/productupload"
      element={user && user?.isadmin ? <Uploadproduct/> 
      : <Navigate to={'/auth'}/>}/>
      <Route path="/:userid/:productid"   
      element={user ? <Eachproductpage/> : <Navigate to={'/auth'}/>}/>
       <Route path="/:id/orderlist" 
      element={user ? <Ordercreate/> : 
      <Navigate to={'/auth'}/>} />  
     {
      <Route path="/admin/updateorders"
      element={user && user?.isadmin ? <Adminorderpage/> 
      : <Navigate to={'/'}/>}/>     
     }
      </Routes>
     
      </div>
      </div>
    </>
  )
}

export default App
