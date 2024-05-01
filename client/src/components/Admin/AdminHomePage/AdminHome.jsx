import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsChatLeftText,
} from "react-icons/bs";

function AdminHome() {
  return (
    <main className="main-container">
      <div className="main-title">
        {/*
            <h3>DASHBOARD</h3>
        </div>

        <div classNameName='main-cards'>
            <div classNameName='card'>
                <div classNameName='card-inner'>
                    <h3>Faculties</h3>
                    <BsFillArchiveFill classNameName='card_icon'/>
                </div>
                <h1>20</h1>
            </div>

            <div classNameName='card'>
                <div classNameName='card-inner'>
                    <h3>Courses</h3>
                    <BsFillGrid3X3GapFill classNameName='card_icon'/>
                </div>
                <h1>10</h1>
            </div>
            <div classNameName='card'>
                <div classNameName='card-inner'>
                    <h3>Students</h3>
                    <BsPeopleFill classNameName='card_icon'/>
                </div>
                <h1>1000</h1>
            </div>
            <div classNameName='card'>
                <div classNameName='card-inner'>
                    <h3>Notifications</h3>
                    <BsFillBellFill classNameName='card_icon'/>
                </div>
                <h1>20</h1>
            </div>

  */}
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Send a Message</h3>
            <BsChatLeftText className="card_icon" />
          </div>
          <div className="container">
            <input
              type="text"
              className="input-box"
              placeholder="Type your message..."
            />
            <button className="send-button">Send</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminHome;
