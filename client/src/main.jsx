import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import NotificationCenter from "./components/HomeCenter.jsx";
import ScrollableCards from "./components/ScrollableCards.jsx";
import "./App.css";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import "./base.css";
import AdminAnnouncementPage from "./components/Admin/AdminAnnouncementPage.jsx";
import AnnouncementPage from "./components/AnnouncementPage.jsx";
import UserDetails from "./components/UserDetails.jsx";
import Programs from "./components/Programs.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
