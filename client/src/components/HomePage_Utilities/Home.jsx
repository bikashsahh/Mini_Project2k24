import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import NotificationCenter from "./HomeCenter";
import axios from "axios";
import { addMessage } from "../../redux/Slice/message"; // Import the addMessage action
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Banner from "./Banner";
import Important_Message from "../Admin/Messages/Important_Message";
import TaskList from "./TaskList";
import StudentProfileForm from "../Students/StudentProfile";

function Home() {
  const [theme, colorMode] = useMode();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    return async () => {
      try {
        const response = await axios.get("http://localhost:3000/messages");
        if (response.status === 200) {
          setMessages(response.data);
          // console.log("QQQ", response.data);
          // Dispatch addMessage action to update Redux store with fetched messages
          response.data.forEach((message) => {
            dispatch(addMessage(message));
          });
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    // fetchMessages();
  }, [dispatch]); // Include dispatch function in dependency array to prevent unnecessary re-fetching
  const homeRef = useRef(null);
  const programsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const scrollToSection = (elementRef, buttonName) => {
    setActiveButton(buttonName);
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  const handleNavigation = (path, buttonName) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "Home":
        homeRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Programs":
        programsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Contact":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "About":
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
    navigate(path);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="">
          <Header />
          {/* <Banner></Banner> */}
          {/* <Important_Message /> */}
          {/* <div className="container marketing"> */}
          {/* <TaskList></TaskList> */}
          {/* <StudentProfileForm></StudentProfileForm> */}
          {/* </div> */}
          {/* <ContactPage></ContactPage> */}
          {/* <div>
            <NotificationCenter />
          </div> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;
