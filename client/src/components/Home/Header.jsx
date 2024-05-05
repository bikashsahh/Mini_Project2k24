import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import InfoIcon from "@mui/icons-material/Info";
import { ColorModeContext } from "../../ui/theme";
import { useTheme } from "@emotion/react";

const Header = ({ handlePage, homeRef, programsRef, contactRef, aboutRef }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeButton, setActiveButton] = useState("Home");

  const ProgramsDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleProgramClick = (program) => {
      handleClick(program, programsRef);
      handleMenuClose();
    };

    return (
      <>
        <Button
          variant={activeButton === "Programs" ? "contained" : "outlined"}
          color="secondary"
          startIcon={<CommentBankIcon />}
          sx={{ border: 0 }}
          onClick={handleMenuClick}
        >
          Programs
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => handleProgramClick("BCA")}>BCA</MenuItem>
          <MenuItem onClick={() => handleProgramClick("MCA")}>MCA</MenuItem>
          <MenuItem onClick={() => handleProgramClick("PGDCA")}>PGDCA</MenuItem>
          <MenuItem onClick={() => handleProgramClick("CIT")}>CIT</MenuItem>
        </Menu>
      </>
    );
  };

  function handleClick(pg, ref) {
    console.log("header Bar click :->", pg);
    setActiveButton(pg);
    handlePage(pg, ref);
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="space-evenly"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 2,
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
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
            onClick={() => handleClick("Home", homeRef)}
            aria-label="Home"
          >
            Home
          </Button>

          <ProgramsDropdown />

          <Button
            variant={activeButton === "Contact" ? "contained" : "outlined"}
            color="secondary"
            startIcon={<OnDeviceTrainingIcon />}
            sx={{ border: 0 }}
            onClick={() => handleClick("Contact", contactRef)}
          >
            Contact
          </Button>

          <Button
            variant={activeButton === "About" ? "contained" : "outlined"}
            color="secondary"
            startIcon={<InfoIcon />}
            sx={{ border: 0 }}
            onClick={() => handleClick("AboutPage", aboutRef)}
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

          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => navigate("/LoginPage")}
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
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Stack>
    </>
  );
};

export default Header;
