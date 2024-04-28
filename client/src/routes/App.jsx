import "bootstrap/dist/css/bootstrap.min.css";
import "../base.css";
import Home from "../components/HomePage_Utilities/Home";

const App = () => {
  // const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  // const [page, setPage] = useState("Dashboard");

  // function handlePage(pg) {
  //   console.log("I got clicked:", pg);
  //   setPage(pg);
  // }
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <div className="app">
    //       <SidebarNew isSidebar={isSidebar} handlePage={handlePage} />
    //       <main className="content">
    //         <Topbar setIsSidebar={setIsSidebar} />
    //         {page === "Dashboard" && (
    //           <DashboardNew handlePage={handlePage}></DashboardNew>
    //         )}
    //         {page === "StudentList" && <Students></Students>}
    //         {page === "Assignment" && <></>}
    //         {page === "ImportExcel" && <ImportStudentData></ImportStudentData>}
    //         {page === "Email" && <SendEmailsButton></SendEmailsButton>}
    //         {page === "Message" && <AdminMessageForm></AdminMessageForm>}
    //         {page === "Announcement" && (
    //           <AdminAnnouncementPage></AdminAnnouncementPage>
    //         )}
    //         {page === "MCA" && <></>}
    //         {page === "CIT" && <></>}
    //         {page === "BCA" && <></>}
    //         {page === "PGDCA" && <></>}
    //       </main>
    //     </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    <Home></Home>
  );
};

export default App;
