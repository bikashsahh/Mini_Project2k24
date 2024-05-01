import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  CssBaseline,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import InfoIcon from "@mui/icons-material/Info";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import ContactPage from "./ContactPage";
import NotificationCenter from "./HomeCenter";
import AboutPage from "./AboutPage";
import Footer from "./Footer";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { useTheme } from "@emotion/react";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // const [theme, colorMode] = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const handleHover = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("isLogedIn") &&
      !location.pathname.includes("/admin")
  );
  const [activeButton, setActiveButton] = useState("Home");

  const homeRef = useRef(null);
  const programsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  // const colorMode = useContext(ColorModeContext);
  const DropdownList = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
      <List
        sx={{
          position: "absolute",
          listStyle: "none",
          padding: 3,
          background: "#dbf5ee",
          color: "black",
          // borderRadius: "15px",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton href="#">
            <ListItemText primary="BCA" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="MCA" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="PGDCA" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="CIT" />
          </ListItemButton>
        </ListItem>
      </List>
    );
  };

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

  const handleLogout = () => {
    window.localStorage.removeItem("isLogedIn");
    setIsAuthenticated(false);
    navigate("/LoginPage");
  };

  useEffect(() => {
    if (location.pathname.includes("/Home")) {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="space-evenly"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 2,
          background:
            useTheme().palette.mode === "dark"
              ? tokens("dark").blueAccent[900]
              : "white",
        }}
      >
        <Stack direction={"row"} spacing={1.5}>
          <Button href="/">
            <img src="logo.png" alt="Mnnit" width="55" height="55" />
          </Button>
          <span className="mt-2">
            MNNIT ALLAHABAD
            <br />
            <span className="">IGNOU Study Centre</span>
          </span>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant={activeButton === "Home" ? "contained" : "outlined"}
            color="secondary"
            startIcon={<HomeIcon />}
            sx={{ border: 0 }}
            onClick={() => handleNavigation("/Home", "Home")}
            aria-label="Home"
          >
            Home
          </Button>

          <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <Button
              variant={activeButton === "Programs" ? "contained" : "outlined"}
              color="secondary"
              startIcon={<CommentBankIcon />}
              sx={{ border: 0 }}
              onClick={() => scrollToSection(null, "Programs")}
            >
              Programs
            </Button>
            <DropdownList isOpen={isOpen} />
          </div>

          <Button
            variant={activeButton === "Contact" ? "contained" : "outlined"}
            color="secondary"
            startIcon={<OnDeviceTrainingIcon />}
            sx={{ border: 0 }}
            onClick={() => scrollToSection(contactRef, "Contact")}
          >
            Contact
          </Button>

          <Button
            variant={activeButton === "About" ? "contained" : "outlined"}
            color="secondary"
            startIcon={<InfoIcon />}
            sx={{ border: 0 }}
            onClick={() => scrollToSection(aboutRef, "About")}
          >
            About
          </Button>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            color="secondary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isAuthenticated ? (
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={() => handleNavigation("/LoginPage")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                href="https://ignouadmission.samarth.edu.in/index.php/registration/user/register"
              >
                Sign-Up
              </Button>
            </Stack>
          )}
        </Stack>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Stack>
      {/* </ThemeProvider> */}
      {/* </ColorModeContext.Provider> */}

      <div ref={homeRef}>
        <NotificationCenter></NotificationCenter>
      </div>
      {/* <div ref={programsRef}>Programs section content</div> */}

      <div ref={contactRef}>
        <ContactPage></ContactPage>
      </div>
      {/* <AboutPage></AboutPage> */}
      <div ref={aboutRef}>
        <AboutPage></AboutPage>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Header;
