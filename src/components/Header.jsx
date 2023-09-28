import React, { useRef,forwardRef } from 'react'
import {BsMinecartLoaded} from "react-icons/bs"
import {BiSearch,BiUser} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

export const Header = ({BtnRef,HitClick}) => {
  const Nav = useNavigate();
  const HandleRedirect = (routees)=>{
    switch(routees){
      case "/daily-deals":
        Nav(routees);
      case "/":
        Nav(routees);
      case "/sign":
        Nav(routees)

    }
  }
  return (

<div
style={{border:"2px solid lightgray",width:"100%",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}
className='fixed justify-evenly align-middle flex z-30 bg-slate-200'>
<div

className='flex w-95 p-5 justify-evenly align-middle'
>
<img 
 onClick={()=>HandleRedirect("/")}

className='w-24 mr-20 ml-4 cursor-pointer' src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg?v=1693549434" alt="" />
 <h3 className='p-5 font-bold text-black cursor-pointer'>
     Categories
 </h3>
 <h3
 onClick={()=>HandleRedirect("/daily-deals")}
 className='p-5 font-bold text-black cursor-pointer'
 >
     Daily Deals
 </h3>
 <h3
 className='p-5 font-bold text-black cursor-pointer'
 >
     Gift With boAt
 </h3>
 <h3
 className='p-5 font-bold text-black cursor-pointer'
 >
    Bulk Orders
 </h3>
 <h3
 className='p-5 font-bold text-black cursor-pointer'
 >
     More
</h3>
</div>
<div className='ml-40 pt-8 flex' >
    
<div className="">
  <input type="text" className="w-72 pl-10 pr-4 py-2 border focus:outline-none focus:ring focus:border-blue-300 rounded-lg outline-offset-4" placeholder="Search..."/>

</div>

<div className='flex pl-5 pt-2'>
    
<BiUser
 onClick={()=>HandleRedirect("/sign")}

size={22} color='black' className='mr-5 cursor-pointer'
/>
         <BsMinecartLoaded
         ref = {BtnRef} onClick={HitClick}
         className='cursor-pointer'
         size={22} color='black'
         />
</div>





</div>

</div>
  )
}
