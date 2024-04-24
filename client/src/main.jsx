import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import LoginPage from "./components/LoginPage.jsx";
import Home from "./components/HomePage_Utilities/Home.jsx";
import Header from "./components/HomePage_Utilities/Header.jsx";
import NotificationCenter from "./components/HomePage_Utilities/HomeCenter.jsx";
import ScrollableCards from "./components/ScrollableCards.jsx";
import { store } from "./redux/Store/store.jsx";
import { Provider } from "react-redux";
import "./base.css";
// import AdminAnnouncementPage from "./components/Admin/AdminAnnouncementPage.jsx";
import AnnouncementPage from "./components/Common/AnnouncementPage.jsx";
// import AnnouncementPage from "./components/"
// import UserDetails from "./components/UserDetails.jsx";
import UserDetails from "./components/Students/UserDetails.jsx";
import Programs from "./components/Programs.jsx";
import AboutPage from "./components/HomePage_Utilities/AboutPage.jsx";
import ContactPage from "./components/HomePage_Utilities/ContactPage.jsx";
import AdminMessageForm from "./components/Admin/Messages/AddMessage.jsx";
import LoginPage from "./components/Common/LoginPage.jsx";
import AdminAnnouncementPage from "./components/Admin/Messages/AdminAnnouncementPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: {
    //   path: "/",
    //   element: <Header></Header>,
    // },
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
    path: "/ScrollableCards",
    element: <ScrollableCards></ScrollableCards>,
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
    path: "/Programs",
    element: <Programs></Programs>,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
