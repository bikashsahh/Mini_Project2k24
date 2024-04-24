import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { useState } from 'react'

function Dashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div> 
  )
}

export default Dashboard;