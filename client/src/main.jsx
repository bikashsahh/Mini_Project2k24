import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./base.css";
// import "./components/Admin/Admin.css";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/AdminAnnouncementPage",
    element: <AdminAnnouncementPage></AdminAnnouncementPage>,
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
    path: "/AdminMessageForm",
    element: <AdminMessageForm></AdminMessageForm>,
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
    path: "/SendEmailsButton",
    element: <SendEmailsButton></SendEmailsButton>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard></Dashboard>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
