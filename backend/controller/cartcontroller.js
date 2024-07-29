import express from 'express'
import Authuser from '../middlewares/authuser.js'
import { createcart, deleteallcart, getcart, getusercart, removefromcart, updatequantity } from '../routehandler/cartroutes.js'

const router=express.Router()

router.post('/',Authuser,createcart)
router.get('/',Authuser,getusercart)
router.put('/',Authuser,updatequantity)
router.post('/delete',Authuser,deleteallcart)
router.post('/remove',Authuser,removefromcart)
router.get('/:id',Authuser,getcart)

export default router