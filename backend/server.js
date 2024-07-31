import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import usercontroller from './controller/usercontroller.js'
import productcontroller from './controller/productcontroller.js'
import cartcontroller from './controller/cartcontroller.js'
import ordercontroller from './controller/ordercontroller.js'

import {v2 as cloudinary} from 'cloudinary'


const app=express()

dotenv.config()

const __dirname=path.resolve()

var port=process.env.PORT || 5000

app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


mongoose.connect(process.env.MONGO_URI)


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APIKEYSECRET  
})

app.use('/api/user',usercontroller)
app.use('/api/product',productcontroller)
app.use('/api/cart',cartcontroller)
app.use('/api/order',ordercontroller)


if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,'frontend/dist')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    })
}


app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
    console.log('MongoDb connected with',process.env.MONGO_URI)
})