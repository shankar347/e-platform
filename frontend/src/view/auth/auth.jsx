import React from 'react'
import { useRecoilValue } from 'recoil'
import authatom from '../atom/loginatom'
import Register from './register'
import Login from './login'

const Auth = () => {

  const auth=useRecoilValue(authatom)
  
  return (
    <>
    {
      auth === "login" ? <Login/> : <Register/>
    }
    </>
  )
}

export default Auth