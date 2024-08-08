import mongoose from "mongoose";


const addressschema=new mongoose.Schema({
    housenumber:{
        type:String,
        default:''
    },
    streetname:{
     type:String,
        default:''
    },
    nearestplace:{
        type:String,
        default:''
    },
    pincode:{
        type:String,
        default:''
    },
    area:{
        type:String,
        default:''
    }
})

const Userscema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phoneno:String,
    isadmin:{
        type:Boolean,
        default:false
    },
    address:{
        type:addressschema,
        default:{}
    }
},{
 timestamps:true
})

const usermodel=mongoose.model('User',Userscema)

export default usermodel
