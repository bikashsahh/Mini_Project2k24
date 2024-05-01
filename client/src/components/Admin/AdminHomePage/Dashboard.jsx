// import React from "react";
// import { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import AdminHeader from "./AdminHeader";

import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminHeader from "./AdminHeader";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      {/* <AdminHeader OpenSidebar={OpenSidebar} /> */}
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="content">
        {selectedTab === "SendEmailsButton" ? (
          <SendEmailsButton></SendEmailsButton>
        ) : (
          "wrong"
        )}
      </div>
      {/* {selectedTabComponent && (
        <div className="content-area">{selectedTab}</div>
      )} */}
    </div>
  );
}

export default Dashboard;
