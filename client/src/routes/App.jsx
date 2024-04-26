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
              {/* <Route path="/DashboardNew" element={<DashboardNew />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
