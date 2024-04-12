import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import InfoIcon from "@mui/icons-material/Info";
import zIndex from "@mui/material/styles/zIndex";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleHover = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = window.localStorage.getItem("isLogedIn");

  const DropdownList = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
      <List
        sx={{
          position: "absolute",
          listStyle: "none",
          padding: 3,
          background: "#EDE7F6",
          borderRadius: "15px",
        }}
      >
        {/* Apply styles using sx */}
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
        {/* -------------- */}
      </List>
    );
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isLogedIn");
    navigate("/LoginPage");
  };

  return (
    <Stack
      direction="row"
      spacing={4}
      justifyContent="space-evenly"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 2,
        background: "#ede7f6",
      }}
    >
      <Stack direction={"row"} spacing={1.5}>
        <Button href="/">
          <img src="logo.png" alt="Mnnit" width="55" height="55" />
        </Button>
        <span className="mt-2 logotext">
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
          variant="outlined"
          color="secondary" // Custom color using hex code
          startIcon={<HomeIcon />}
          sx={{ border: 0 }}
          to="/"
          aria-label="Home" // Added aria-label for accessibility
        >
          Home
        </Button>

        <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
          {/* Event listeners for hover */}
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CommentBankIcon />}
            sx={{ border: 0 }}
          >
            Programs
          </Button>
          <DropdownList isOpen={isOpen} />{" "}
          {/* Render dropdown based on isOpen */}
        </div>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<OnDeviceTrainingIcon />}
          sx={{ border: 0 }}
          href="/"
        >
          Contact
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<InfoIcon />}
          sx={{ border: 0 }} // Added sx prop for styling with border: 0
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
    </Stack>
  );
};

export default Header;
