import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../base.css";
import SidebarNew from "../components/Admin/Sidebar/SidebarNew";
import DashboardNew from "../components/Admin/DashboardNew/dashboardNew";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../components/Admin/Sidebar/topbar";
import ImportStudentData from "../components/Admin/Sidebar/Students/ImportStudentData";
import SendEmailsButton from "../components/Admin/Sidebar/SendEmail/SendEmailsButton";
import AdminMessageForm from "../components/Admin/Messages/AddMessage";
import AdminAnnouncementPage from "../components/Admin/Messages/AdminAnnouncementPage";
import Contacts from "../components/Pages/contacts";
import Home from "../components/HomePage_Utilities/Home";
import Admin from "../components/Admin/Admin";
const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");

  function handlePage(pg) {
    console.log("I got clicked:", pg);
    setPage(pg);
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarNew isSidebar={isSidebar} handlePage={handlePage} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            {page === "Dashboard" && (
              <DashboardNew handlePage={handlePage}></DashboardNew>
            )}
            {page === "StudentList" && <Contacts></Contacts>}
            {page === "Assignment" && <></>}
            {page === "ImportExcel" && <ImportStudentData></ImportStudentData>}
            {page === "Email" && <SendEmailsButton></SendEmailsButton>}
            {page === "Message" && <AdminMessageForm></AdminMessageForm>}
            {page === "Announcement" && (
              <AdminAnnouncementPage></AdminAnnouncementPage>
            )}
            {page === "MCA" && <></>}
            {page === "CIT" && <></>}
            {page === "BCA" && <></>}
            {page === "PGDCA" && <></>}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
