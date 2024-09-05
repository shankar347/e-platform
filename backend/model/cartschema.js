import mongoose from "mongoose";

const cartschema=new mongoose.Schema({
    user: 
    {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    products: [
        {
            product:
             {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
            },
           quantity:{
           type:Number,
           default:1
         },
         color:{
            type:String
         }
        }]
},{timestamps:true})

const cartmodel=mongoose.model('Cart',cartschema)

export default cartmodel

