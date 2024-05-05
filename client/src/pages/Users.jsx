import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../ui/theme";
import StudentDashboardNew from "../components/Users/StudentDashboard.jsx";
import ProfilePage from "../components/Users/StudentProfileDash.jsx";
import AssignmentForm from "../components/Users/AssignmentForm.jsx";
import { useLocation } from "react-router-dom";
import SubmissionList from "../components/Users/SubmissionList.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import handleLogoutOperations from "../util/utils.js";
import Topbar from "../ui/Topbar.jsx";
import StudentSidebar from "../sidebar/StudentSidebar.jsx";

const Users = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const registrationno = location.state?.registrationno || "";
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    async function verifyStudent() {
      try {
        // Define the URL of the endpoint
        const URL = "http://localhost:3000/verifystudent";

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
        alert("An error occurred. Please try again later.");
        console.error("Error:", error);
      }
    }

    verifyStudent();
  }, [navigator]);

  function handlePage(pg) {
    setPage(pg);
  }

  console.log("Token valid:", tokenValid);

  if (!tokenValid) {
    console.log("Redirecting...");
    return null; // or any loading state or component while checking token validity
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StudentSidebar
            isSidebar={isSidebar}
            handlePage={handlePage}
            registrationno={registrationno}
          />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            {page === "Dashboard" && (
              <StudentDashboardNew
                handlePage={handlePage}
                registrationno={registrationno}
              ></StudentDashboardNew>
            )}
            {page === "Profile" && <ProfilePage></ProfilePage>}
            {page === "Assignments" && <AssignmentForm></AssignmentForm>}
            {page === "PreviousAssignment" && <SubmissionList></SubmissionList>}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Users;
