import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import StudentTopbar from "./StudentTopbar";
import StudentSidebarNew from "./StudentSidebarNew";
import StudentDashboardNew from "./StudentDashboardNew";
import ProfilePage from "./StudentProfileDash";
import AssignmentForm from "../Assignment/AssignmentForm";
import { useLocation } from "react-router-dom";
import SubmissionList from "./SubmissionList";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const registrationno = location.state?.registrationno || "";
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      setTokenValid(true);
    } else {
      console.log("Token not found");
      navigator("/Home");
    }
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
          <StudentSidebarNew
            isSidebar={isSidebar}
            handlePage={handlePage}
            registrationno={registrationno}
          />
          <main className="content">
            <StudentTopbar setIsSidebar={setIsSidebar}></StudentTopbar>

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
