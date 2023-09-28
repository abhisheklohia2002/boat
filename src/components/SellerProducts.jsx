import React, { useState } from 'react'

export const SellerProducts = ({poster,videourl}) => {
 
    const [showcontrol,setshowcontrol] = useState(false) 
    const HandlePlay = ()=>{
       setshowcontrol(!showcontrol)
    }
  return (
    <div>
<video 
controls = {showcontrol}
 onMouseEnter={HandlePlay}

className='rounded-2xl object-cover h-72 cursor-pointer'
preload='none' loop  = {true} playsInline = {true} muted = {true}
poster={poster}
src={videourl}></video>
    </div>
  )
}
