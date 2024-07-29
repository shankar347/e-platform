import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import Productcontext from './view/proudctpage/productcontext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <RecoilRoot>
      <ChakraProvider>
        <Productcontext>
      <App />
      </Productcontext>
      </ChakraProvider>
    </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
