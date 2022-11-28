import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Upload from './Components/Upload'

function Routing() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/uploads' element={<Upload/>}/>
   </Routes>
  )
}

export default Routing