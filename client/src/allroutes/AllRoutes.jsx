import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Deals from '../pages/Deals'
import SignIn from '../pages/SignIn'

export default function AllRoutes() {
  return (
    <Routes>
<Route path = "/" element = {<Home/>}
/>
<Route path='/daily-deals' element={<Deals/>} />
<Route path = "/sign" element = {<SignIn/>} />

    </Routes>
  )
}
