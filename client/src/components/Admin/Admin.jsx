import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../base.css";
// import SidebarNew from "../components/Admin/Sidebar/SidebarNew";
import SidebarNew from "./Sidebar/SidebarNew";
// import DashboardNew from "../components/Admin/DashboardNew/dashboardNew";
import DashboardNew from "./DashboardNew/dashboardNew";
// import { ColorModeContext, useMode } from "../theme";
import { ColorModeContext, useMode } from "../../theme";
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
// import StudentsList from "../components/Students/StudentsList";
import StudentsList from "../Students/StudentsList";
// import AssignmentList from "../components/Students/Assignment/AssignmentList";
import AssignmentList from "../Students/Assignment/AssignmentList";
import AttendanceSheet from "./Sidebar/Students/Attendance";
import MessagesList from "./Messages/MessagesList";
import AnnouncementDeletePage from "./Messages/AccouncementDeletePage";
const Admin = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");

  function handlePage(pg) {
    console.log("App got clicked:", pg);
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
            {page === "StudentList" && <StudentsList></StudentsList>}
            {page === "Assignment" && <AssignmentList></AssignmentList>}
            {page === "ImportExcel" && <ImportStudentData></ImportStudentData>}
            {page === "Email" && <SendEmailsButton></SendEmailsButton>}
            {page === "Message" && <AdminMessageForm></AdminMessageForm>}
            {page === "Announcement" && (
              <AdminAnnouncementPage></AdminAnnouncementPage>
            )}
            {page === "Attendance" && <AttendanceSheet></AttendanceSheet>}
            {page === "MessageList" && <MessagesList></MessagesList>}
            {page === "AnnouncementDeletePage" && (
              <AnnouncementDeletePage></AnnouncementDeletePage>
            )}
            {page === "BCA" && <></>}
            {page === "PGDCA" && <></>}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
