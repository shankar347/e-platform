import mongoose from "mongoose";


const orderschema=new mongoose.Schema({
     userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     orderitems:[{
        productid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
         type:Number,
         default:1
        },
        price:{
            type:Number,
            default:0
        }
     }],
    totalprice:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:['Pending','Shipped','Delivered','Cancelled'],
        default:"Pending"
    },
    orderdate:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const ordermodel=mongoose.model('Order',orderschema)

export default ordermodel