import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Box, TextField, Alert } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const LoginPage = () => {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const registrationRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registration = registrationRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:3000/login", {
        registration,
        password,
      });

      if (response.data.success) {
        window.localStorage.setItem("isLogedIn", true);
        if (response.data.isAdmin) {
          navigate("/Home");
        } else {
          // navigate("/AssignmentForm");
          navigate("/AssignmentForm", {
            state: { registrationno: registration },
          });
        }
      } else {
        setLoginError("Email or password is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      setLoginError("Email or password is incorrect. Please try again.");
    }, 100);
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100vh",
        padding: "170px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          ml: 8,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "-1",
          backgroundImage: "url('bg1.jpg')",
        }}
      />
      <Box sx={{ width: "400px", zIndex: "2" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h2"
            className="design"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: "bold",
              p: "0.5rem 1rem",
              borderRadius: "4px",
              color: "#673AB7",
            }}
          >
            Welcome To MNNIT-IGNOU
          </Typography>
          <Div className="opacity-70">Login to your account</Div>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                type="RegistrationNo"
                name="RegistrationNo"
                variant="outlined"
                label="Registration Number"
                color="secondary"
                inputRef={registrationRef}
                required
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <TextField
                type="password"
                name="password"
                variant="outlined"
                label="Password Is Your Registration No"
                color="secondary"
                // helperText="All the best"
                inputRef={passwordRef}
                required
                fullWidth
              />
            </Box>
            {loginError && (
              <Box mb={3}>
                <Alert severity="error">{loginError}</Alert>
              </Box>
            )}
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              className={`text-bold ${isButtonClicked ? "clicked" : ""}`}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Box>
        <Grid item sx={{ p: 2 }}>
          <Typography variant="body2" align="center" gutterBottom>
            Don't have an account?{" "}
            <a
              href="https://ignou.samarth.edu.in/index.php/studentlogin/registration/register"
              className="text-decoration-none"
            >
              <Typography variant="contained" sx={{ color: "#673AB7" }}>
                Sign Up
              </Typography>
            </a>
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
