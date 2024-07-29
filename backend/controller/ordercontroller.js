import express from 'express'
import Authuser from '../middlewares/authuser.js'
import { createorder, getallorders, getorder, updateorder }
 from '../routehandler/orderroutes.js'

const router=express.Router()

router.post('/',Authuser,createorder)
router.get('/',Authuser,getallorders)
router.get('/:id',Authuser,getorder)
router.put('/:id',Authuser,updateorder)

export default router