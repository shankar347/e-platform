import React, { useEffect, useState } from 'react'

const Timecompnent = ({date}) => {
    // console.log(date)

    const [time,settime]=useState('')
    const currentime=new Date()
    const orderdtime=new Date(date)
    const timeDiff = Math.abs(currentime - orderdtime)/1000;
    
    useEffect(()=>{
       const updatetime=()=>{
         const years=currentime.getFullYear() - orderdtime.getFullYear()
         const month=currentime.getMonth() - orderdtime.getMonth()
         const days=currentime.getDate() - orderdtime.getDate()
         const hours=currentime.getHours() - orderdtime.getHours()
         const minutes=currentime.getMinutes() - orderdtime.getMinutes()

         if(years > 0)
         {
            settime(`${years ===1 ? 'a' : years } 
                ${years === 1 ? 'year' : 'years'} `)
         }
       
       else if(month > 0)
        {
            settime(`${month ===1 ? 'a' : month } 
                ${month === 1 ? 'month' : 'months'} `)
        }
       else if(days > 0)
        {
             settime(`${days ===1 ? 'a' : days }
                 ${days === 1 ? 'day' : 'days'} `)
        }
        
       else if(hours > 0)
        {
               settime(`${hours ===1 ? 'a' : hours }
                 ${hours === 1 ? 'hour' : 'hours'} `)
        }
        
        else if(minutes > 0)
        {
            settime(`${minutes ===1 ? 'a' : minutes }
                ${minutes === 1 ? 'minute' : 'minutes'} `)
        }   
    
        else{
            settime('Just now')
        }
       }
       updatetime()
       
       const timeinteral=setInterval(updatetime,60000)

       return ()=>clearInterval(timeinteral)
       
    },[date])

  return (
    <div className='flex'>{time} ago</div>
  )
}

export default Timecompnent