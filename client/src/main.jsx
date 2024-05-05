import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ui/base.css";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Home/Header.jsx";
import AnnouncementPage from "./common/AnnouncementPage.jsx";
import UserDetails from "./components/Users/UserDetails.jsx";
import AboutPage from "./components/Home/AboutPage.jsx";
import ContactPage from "./components/Home/ContactPage.jsx";
import AdminMessageForm from "./Messages/AddMessage.jsx";
import LoginPage from "./common/LoginPage.jsx";
import AdminAnnouncementPage from "./components/Admin/AdminAnnouncementPage.jsx";
import SendEmailsButton from "./components/Admin/SendEmailsButton.jsx";
import AssignmentForm from "./components/Users/AssignmentForm.jsx";
import AdminSidebar from "./sidebar/AdminSidebar.jsx";
import Topbar from "./ui/Topbar.jsx";
import StudentsList from "./components/Admin/StudentsList.jsx";
import AssignmentList from "./components/Admin/AssignmentList.jsx";
import Admin from "./pages/Admin.jsx";
import Users from "./pages/Users.jsx";
import ProfilePage from "./components/Users/StudentProfileDash.jsx";
import { Provider } from "./context/context.jsx";
import SubmissionList from "./components/Users/SubmissionList.jsx";
import AttendanceSheet from "./components/Admin/Attendance.jsx";
import MessagesList from "./Messages/MessagesList.jsx";
import AnnouncementDeletePage from "./components/Admin/AccouncementDeletePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/Admin",
    element: <Admin></Admin>,
  },
  {
    path: "/submissionslist",
    element: <SubmissionList></SubmissionList>,
  },
  {
    path: "/LoginPage",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/Header",
    element: <Header></Header>,
  },
  {
    path: "/Home",
    element: <Home></Home>,
  },

  {
    path: "/AnnouncementPage",
    element: <AnnouncementPage></AnnouncementPage>,
  },
  {
    path: "/UserDetails",
    element: <UserDetails></UserDetails>,
  },
  {
    path: "/Contact",
    element: <ContactPage></ContactPage>,
  },
  {
    path: "/AboutPage",
    element: <AboutPage></AboutPage>,
  },

  {
    path: "/AssignmentForm",
    element: <AssignmentForm></AssignmentForm>,
  },
  {
    path: "/StudentProfile",
    element: <ProfilePage></ProfilePage>,
  },

  {
    path: "/email",
    element: <SendEmailsButton></SendEmailsButton>,
  },
  {
    path: "/message",
    element: <AdminMessageForm></AdminMessageForm>,
  },
  {
    path: "/announcement",
    element: <AdminAnnouncementPage></AdminAnnouncementPage>,
  },
  {
    path: "/studentlist",
    element: <StudentsList></StudentsList>,
  },
  {
    path: "/assignmentlist",
    element: <AssignmentList></AssignmentList>,
  },

  {
    path: "/adminsidebar",
    element: <AdminSidebar></AdminSidebar>,
  },
  {
    path: "/topbar",
    element: <Topbar></Topbar>,
  },
  {
    path: "/users",
    element: <Users></Users>,
  },
  {
    path: "/attendancesheet",
    element: <AttendanceSheet></AttendanceSheet>,
  },
  {
    path: "/messageList",
    element: <MessagesList></MessagesList>,
  },
  {
    path: "/announcementDeletePage",
    element: <AnnouncementDeletePage></AnnouncementDeletePage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);
