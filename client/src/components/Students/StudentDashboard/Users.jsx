import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import StudentTopbar from "./StudentTopbar";
import StudentSidebarNew from "./StudentSidebarNew";
import StudentDashboardNew from "./StudentDashboardNew";
import ProfilePage from "./StudentProfileDash";
const Users = () => {
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
          <StudentSidebarNew isSidebar={isSidebar} handlePage={handlePage} />
          <main className="content">
            <StudentTopbar setIsSidebar={setIsSidebar}></StudentTopbar>

            {page === "Dashboard" && (
                <StudentDashboardNew handlePage={handlePage}></StudentDashboardNew>
            )}
            {page === "Profile" && <ProfilePage></ProfilePage>}
            {page === "Assignment" && <EnrolledCourses></EnrolledCourses>}
            {page === "PreviousAssignment" && <PreviousAssignment></PreviousAssignment>}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Users;
