import express from 'express'
import { addtofavourites, createproduct, createrating, createreview, deleteproduct, deletereview, getallproduct, getallreivews, getfavourites, getnewproducts, getproduct,
     getrandomproduct,
      gettopproducts, updateproduct, updatereview } from '../routehandler/productroutes.js'
import Authuser from '../middlewares/authuser.js'

const router=express.Router()


router.post('/',Authuser ,createproduct)
router.get('/',getallproduct)
router.get('/random-product',Authuser,getrandomproduct)
router.get('/topproduct',Authuser,gettopproducts)
router.get('/new-product',Authuser,getnewproducts)
router.get('/favourites',Authuser,getfavourites)
router.put('/admin/:id',Authuser,updateproduct)
router.delete('/admin/:id',Authuser,deleteproduct)
router.get('/:id',Authuser,getproduct)
router.post('/:id',Authuser,createreview)
router.put('/:id',Authuser,updatereview)
router.delete('/:id',Authuser,deletereview)
router.get('/:id/review',Authuser,getallreivews)
router.post('/:id/rating',Authuser,createrating)
router.post('/:id/favourites',Authuser,addtofavourites)

export default router

