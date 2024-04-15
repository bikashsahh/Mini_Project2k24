import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill,BsChatLeftText}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Home() {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Faculties</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>20</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Courses</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>10</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Students</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>1000</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Notifications</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>20</h1>
            </div>
            
           
        </div>


        <div className="main-cards">
        <div className='card'>
                <div className='card-inner'>
                    <h3>Send a Message</h3>
                    <BsChatLeftText className='card_icon'/>
                </div>
                <div class="container">
                <input type="text" class="input-box" placeholder="Type your message..."/>
                <button class="send-button">Send</button>
                </div>
            </div>
        </div>   
    </main>
  )
}

export default Home