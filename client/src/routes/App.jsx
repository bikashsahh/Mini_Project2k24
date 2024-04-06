import "bootstrap/dist/css/bootstrap.min.css";
// import LoginPage from "./components/LoginPage";
import Home from "../components/Home";

// function App() {
//   return (
//     <div>
//       {/* <LoginPage></LoginPage> */}
//     </div>
//   );
// }
// export default App;
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "./components/Header";
// import NotificationCenter from "./components/NotificationCenter";
// import ScrollableCards from "./components/ScrollableCards";
import "../base.css";
// import Sidebar from "./components/Admin/Sidebar";
import Dashboard from "../components/Admin/Dashboard";

const App = () => {
  return <Home></Home>;
  // return <Sidebar></Sidebar>;
  // return <Dashboard />;
  // return <LoginPage />;
};

export default App;
