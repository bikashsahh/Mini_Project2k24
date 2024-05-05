import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ColorModeContext, useMode } from "../ui/theme";
import Topbar from "../ui/Topbar.jsx";
import ImportStudentData from "../components/Admin/ImportStudentData.jsx";
import SendEmailsButton from "../components/Admin/SendEmailsButton.jsx";
import AdminMessageForm from "../Messages/AddMessage.jsx";
import AdminAnnouncementPage from "../components/Admin/AdminAnnouncementPage.jsx";
import StudentsList from "../components/Admin/StudentsList.jsx";
import AssignmentList from "../components/Admin/AssignmentList.jsx";
import AttendanceSheet from "../components/Admin/Attendance.jsx";
import MessagesList from "../Messages/MessagesList.jsx";
import AnnouncementDeletePage from "../components/Admin/AccouncementDeletePage.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import handleLogoutOperations from "../util/utils.js";
import AdminSidebar from "../sidebar/AdminSidebar.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";

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
          navigator("/");
        }
      } catch (error) {
        handleLogoutOperations();
        navigator("/");
        alert("You are not authorized. Please try again later.");
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
          <AdminSidebar isSidebar={isSidebar} handlePage={handlePage} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            {page === "Dashboard" && <AdminDashboard handlePage={handlePage} />}
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
