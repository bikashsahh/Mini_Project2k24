import React from 'react';
import { Link, Route,Routes } from 'react-router-dom';

import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsFillGearFill, BsLock, BsAwardFill } from 'react-icons/bs';

// Import corresponding components for each link
// import Dashboard from './Dashboard';
import Courses from './Courses';
// import Categories from './Categories';
// import Students from './Students';
// import Institutions from './Institutions';
// import Settings from './Settings';
// import Logout from './Logout';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-title'>
                    <div className='sidebar-brand'>
                    <BsAwardFill className='icon_header' /> ADMIN
                    </div>
                    <span className='icon close_icon' onClick={OpenSidebar}>X</span>
                    </div>
                    
                    <ul className='sidebar-list'>
                    {/* <li className='sidebar-list-item'>
                    <Link to="/">
                    <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li> */}
                <li className='sidebar-list-item'>
                <Link to="/courses">
                <BsFillArchiveFill className='icon' /> Courses
                </Link>
                    </li>
                    <li className='sidebar-list-item'>
                    <Link to="/categories">
                    <BsFillGrid3X3GapFill className='icon' /> Categories
                    </Link>
                    </li>


                    <li className='sidebar-list-item'>
                    <Link to="/students">
                    <BsPeopleFill className='icon' /> Students
                    </Link>
                    </li>


                    <li className='sidebar-list-item'>
                    <Link to="/students">
                    <BsPeopleFill className='icon' /> Students
                    </Link>
                    </li>




                    <li className='sidebar-list-item'>
                    <Link to="/institutions">
                    <BsListCheck className='icon' /> Institutions
                    </Link>
                    </li>
                    <li className='sidebar-list-item'>
                    <Link to="/SendEmailsButton">
                    <BsFillGearFill className='icon' /> Send mail to all students
                    </Link>
                    </li>
                    <li className='sidebar-list-item'>
                    <Link to="/logout">
                    <BsLock className='icon' /> Logout
                    </Link>
                </li> 
                </ul>
                </aside>
                
            //     <Routes>
            //     {/* <Route exact path="/" component={Dashboard} /> */}
            //     // <Route path="/Courses" component={<Courses/>} />
            //     {/* <Route path="/categories" component={Categories} />
            //     <Route path="/students" component={Students} />
            //     <Route path="/institutions" component={Institutions} />
            //     <Route path="/settings" component={Settings} />
            // <Route path="/logout" component={Logout} /> */}
            // </Routes>
        );
    }

export default Sidebar;
