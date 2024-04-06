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
// import Sidebar from "./components/Admin/Sidebar.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Sidebar from "./components/Admin/SideBar.jsx";
import "./base.css";

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
  // {
  //   path: "/Sidebar",
  //   element: <Sidebar></Sidebar>,
  // },
  {
    path: "/Dashboard",
    element: <Dashboard></Dashboard>,
    children: [{ path: "Sidebar", element: <Sidebar></Sidebar> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
