import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./base.css";

// import "./components/Admin/Admin.css";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/HomePage_Utilities/Home.jsx";
import Header from "./components/HomePage_Utilities/Header.jsx";
import NotificationCenter from "./components/HomePage_Utilities/HomeCenter.jsx";
import { store } from "./redux/Store/store.jsx";
import { Provider } from "react-redux";
import AnnouncementPage from "./components/Common/AnnouncementPage.jsx";
import UserDetails from "./components/Students/UserDetails.jsx";
import AboutPage from "./components/HomePage_Utilities/AboutPage.jsx";
import ContactPage from "./components/HomePage_Utilities/ContactPage.jsx";
import AdminMessageForm from "./components/Admin/Messages/AddMessage.jsx";
import LoginPage from "./components/Common/LoginPage.jsx";
import AdminAnnouncementPage from "./components/Admin/Messages/AdminAnnouncementPage.jsx";
import Courses from "./components/Admin/Sidebar/Students/Courses.jsx";
import Students from "./components/Admin/Sidebar/Students/Students.jsx";
import SendEmailsButton from "./components/Admin/Sidebar/SendEmail/SendEmailsButton.jsx";
import Dashboard from "./components/Admin/AdminHomePage/Dashboard.jsx";
import ImportStudentData from "./components/Admin/Sidebar/Students/ImportStudentData.jsx";
import AssignmentForm from "./components/Students/Assignment/AssignmentForm.jsx";
import SidebarNew from "./components/Admin/Sidebar/SidebarNew.jsx";
import Admin from "./components/Admin/Admin.jsx";
import Contacts from "./components/Pages/contacts/index.jsx";
import Sidebar from "./components/Admin/Sidebar/Sidebar.jsx";
import Topbar from "./components/Admin/Sidebar/topbar.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
    path: "/NotificationCenter",
    element: <NotificationCenter></NotificationCenter>,
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
    path: "/About",
    element: <AboutPage></AboutPage>,
  },

  {
    path: "/courses",
    element: <Courses></Courses>,
  },
  {
    path: "/students",
    element: <Students></Students>,
  },

  {
    path: "/Dashboard",
    element: <Dashboard></Dashboard>,
  },

  {
    path: "/AssignmentForm",
    element: <AssignmentForm></AssignmentForm>,
  },
  {
    path: "/side",
    element: <Sidebar></Sidebar>,
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
    path: "/contact",
    element: <Contacts></Contacts>,
  },
  {
    path: "/SidebarNew",
    element: <SidebarNew></SidebarNew>,
  },
  {
    path: "/topbar",
    element: <Topbar></Topbar>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);
