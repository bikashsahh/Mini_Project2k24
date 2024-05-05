// Home.js
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Header from "../components/Home/Header";
import { useUserContext } from "../context/context";
import { ColorModeContext, useMode } from "../ui/theme";
import Footer from "../components/Home/Footer";
import ContactPage from "../components/Home/ContactPage";
import AboutPage from "../components/Home/AboutPage";
import Banner from "./Banner";
import Important_Message from "../components/Home/Important_Message";
import TaskList from "../components/Home/TaskList";
import StudentProfileForm from "../components/Home/StudentProfile";
import "./Home.css";
function Home() {
  const { messages } = useUserContext();
  const [theme, colorMode] = useMode();
  const [page, setPage] = useState("Home");

  useEffect(() => {
    return async () => {};
  }, [messages]);

  const homeRef = useRef(null);
  const programsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (elementRef, buttonName) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  function handlePage(pg, ref) {
    scrollToSection(ref, pg);
    setPage(pg);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="home-container">
          <Header
            handlePage={handlePage}
            homeRef={homeRef}
            programsRef={programsRef}
            contactRef={contactRef}
            aboutRef={aboutRef}
          />
          <div ref={homeRef}>
            <Banner></Banner>
            <Important_Message />
            <div className="container marketing">
              <TaskList></TaskList>
              <StudentProfileForm></StudentProfileForm>
            </div>
          </div>
          <div ref={contactRef}>
            <ContactPage></ContactPage>
          </div>
          <div ref={aboutRef}>
            <AboutPage></AboutPage>
          </div>
        </div>
        <Footer></Footer>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;
