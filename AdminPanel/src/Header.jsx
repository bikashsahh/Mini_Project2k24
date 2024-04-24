import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';


function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <Link to="/redirect"><BsFillEnvelopeFill className='icon'/></Link>
            {/* <BsFillEnvelopeFill className='icon'/> */}
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header