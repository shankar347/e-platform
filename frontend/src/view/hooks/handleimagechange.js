import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const Hanleimage = () => {
 
    const [imageurl,setimageurl]=useState(null)
    const toast=useToast()
    const iamagechange=(e)=>{
    
        const file=e.target.files[0]
    
        if( file && file.type.startsWith('image/'))
        {
            const reader=new FileReader()

            reader.onloadend=()=>{
                setimageurl(reader.result)
            }
           reader.readAsDataURL(file)
        }
       else
       {
         toast({
            description:'Invalide file type',
            status:'error',
            duration:3000
         })
       }
    }

    return {imageurl,setimageurl,iamagechange}
}

export default Hanleimage