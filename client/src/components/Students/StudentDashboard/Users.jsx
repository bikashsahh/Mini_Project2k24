import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import StudentTopbar from "./StudentTopbar";
import StudentSidebarNew from "./StudentSidebarNew";
import StudentDashboardNew from "./StudentDashboardNew";
import ProfilePage from "./StudentProfileDash";
import AssignmentForm from "../Assignment/AssignmentForm";
import { useLocation } from "react-router-dom";
import SubmissionList from "./SubmissionList";

const Users = () => {
  const location = useLocation();
  const registrationno = location.state?.registrationno || "";
  // console.log("users registration no", registrationno);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [page, setPage] = useState("Dashboard");

  function handlePage(pg) {
    console.log("user got clicked:", pg);
    setPage(pg);
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
