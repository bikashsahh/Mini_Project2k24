import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../base.css";
// import SidebarNew from "../components/Admin/Sidebar/SidebarNew";
import SidebarNew from "./Sidebar/SidebarNew";
import DashboardNew from "./DashboardNew/dashboardNew";
// import DashboardNew from "../components/Admin/DashboardNew/dashboardNew";
import { ColorModeContext, useMode } from "../../theme";
// import { ColorModeContext, useMode } from "../theme";
// import Topbar from "../components/Admin/Sidebar/topbar";
import Topbar from "./Sidebar/topbar";
// import ImportStudentData from "../components/Admin/Sidebar/Students/ImportStudentData";
import ImportStudentData from "./Sidebar/Students/ImportStudentData";
// import SendEmailsButton from "../components/Admin/Sidebar/SendEmail/SendEmailsButton";
import SendEmailsButton from "./Sidebar/SendEmail/SendEmailsButton";
// import AdminMessageForm from "../components/Admin/Messages/AddMessage";
import AdminMessageForm from "./Messages/AddMessage";
// import AdminAnnouncementPage from "../components/Admin/Messages/AdminAnnouncementPage";
import AdminAnnouncementPage from "./Messages/AdminAnnouncementPage";
// import Contacts from "../components/Pages/contacts";
import Contacts from "../Pages/contacts";
// import Contacts from "../Pages/contacts";
// import Home from "../components/HomePage_Utilities/Home";
import { BrowserRouter } from "react-router-dom";
import Home from "../HomePage_Utilities/Home";
const Admin = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <SidebarNew isSidebar={isSidebar} handlePage={handlePage} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}

            {/* <SendEmailsButton></SendEmailsButton>
            <SendEmailsButton></SendEmailsButton> */}
            <></>
          </main>
          {/* <Contacts></Contacts> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
