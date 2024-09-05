import mongoose  from "mongoose";

const productschema=new mongoose.Schema({
   name:
   {
    type:String,
    required:true
   },
   price:{
    type:String,
    required:true
   } ,
   image:{
    type:String,
    required:true
   },
   likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'}],
   stock:{
    type:Number,
    default:0
   },
   descreption:{
    type:String,
    default:0
   },
   rating:{
    type:Number,
   },
   colors:{
    type:String,
   },
   reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }  ,
      name:{
        type:String
      },
      comment:{
        type:String
      }
    }
   ],
   discountprice:{
     type:String,
   }
},{timestamps:true})

const productmodel=mongoose.model('Product',productschema)

export default productmodel