import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ui/base.css";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import AnnouncementPage from "./common/AnnouncementPage.jsx";
import UserDetails from "./components/Users/UserDetails.jsx";
import LoginPage from "./common/LoginPage.jsx";
import Admin from "./pages/Admin.jsx";
import Users from "./pages/Users.jsx";
import { Provider } from "./context/context.jsx";
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
    path: "/LoginPage",
    element: <LoginPage></LoginPage>,
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
    path: "/users",
    element: <Users></Users>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
