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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import handleLogoutOperations from "../../util/utils.js";

const Admin = () => {
  const navigator = useNavigate();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    async function verifyAdmin() {
      try {
        // Define the URL of the endpoint
        const URL = "http://localhost:3000/verifyadmin";

        // Define the token (replace 'your-token' with the actual token)
        const token = localStorage.getItem("token");

        // Define the headers with the authorization token
        const headers = {
          Authorization: token,
        };

        // Make the request to the endpoint
        const response = await axios.get(URL, { headers });

        if (response.data.success === true) {
          setTokenValid(true);
        } else {
          handleLogoutOperations();
          alert("You are not authorized to access this page");
          navigator("/Home");
        }
      } catch (error) {
        handleLogoutOperations();
        navigator("/Home");
        alert("Internal Server Error. Please try again later.");
        // Log the error message
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    }

    // Call the function to verify admin
    verifyAdmin();
  }, [navigator]);

  console.log("Token valid:", tokenValid);

  if (!tokenValid) {
    console.log("Redirecting...");
    return null; // or any loading state or component while checking token validity
  }

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
