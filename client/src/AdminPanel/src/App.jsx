import { useState } from 'react'
import './App.css'
import RedirectButton from './RedirectButton'
import Dashboard from "./Dashboard"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Courses from './Courses'
import Students from './Students'

function App() {
 
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/courses" element={<Courses/>} />
        <Route path="/redirect" element={<RedirectButton/>}/>
        <Route path="/students" element={<Students/>}/>
      
      </Routes>
  )
}

export default App;
