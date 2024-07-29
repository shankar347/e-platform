import express from 'express'

import {deletaccount, getuser, logoutuser, updateuser, userlogin,userregister} from '../routehandler/userroutes.js'
import Authuser from '../middlewares/authuser.js'


const app=express.Router()

app.post('/login',userlogin)
app.get('/',Authuser,logoutuser)
app.post('/register',userregister)
app.put('/profile/:id',updateuser)
app.delete('/',Authuser,deletaccount)
app.get('/:id',Authuser,getuser)



export default app