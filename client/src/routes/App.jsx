import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../base.css";
import SidebarNew from "../components/Admin/Sidebar/SidebarNew";
import Home from "../components/HomePage_Utilities/Home";
import DashboardNew from "../components/Admin/DashboardNew/dashboardNew";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../components/Admin/Sidebar/topbar";
import ImportStudentData from "../components/Admin/Sidebar/Students/ImportStudentData";
import SendEmailsButton from "../components/Admin/Sidebar/SendEmail/SendEmailsButton";
import Important_Message from "../components/Admin/Messages/Important_Message";
import AdminMessageForm from "../components/Admin/Messages/AddMessage";
import AdminAnnouncementPage from "../components/Admin/Messages/AdminAnnouncementPage";
import LoginPage from "../components/Common/LoginPage";
import Contacts from "../components/Pages/contacts";
const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // return <Home />;
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarNew isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<DashboardNew />} />
              <Route
                path="/ImportStudentData"
                element={<ImportStudentData />}
              />
              <Route path="/email" element={<SendEmailsButton />} />
              <Route path="/message" element={<AdminMessageForm />} />
              <Route path="/announcement" element={<AdminAnnouncementPage />} />
              <Route path="/contactdemo" element={<Contacts />} />
              {/* <Route path="/loginpage" element={<LoginPage />} /> */}

              {/* <Route path="/program" element={< />} /> */}

              {/* <Route path="/DashboardNew" element={<DashboardNew />} /> */}
            </Routes>
            {/* <Routes>
            </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
