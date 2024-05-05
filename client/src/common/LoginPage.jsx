import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/context.jsx";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SyncLockOutlinedIcon from "@mui/icons-material/SyncLockOutlined";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Alert,
  Modal,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleLogoutOperations from "../util/utils.js";

const LoginPage = () => {
  const { setRegistrationNo, userData } = useUserContext();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const registrationRef = useRef(null);
  const passwordRef = useRef(null);
  const [id, setId] = useState(null);
  const forgotPasswordRegistrationRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registration = registrationRef.current.value;
    const password = passwordRef.current.value;
    setRegistrationNo(registration);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        registration,
        password,
      });

      if (response.data.success) {
        window.localStorage.setItem("isLogedIn", true);
        // console.log("response.token:: ", response.data.token);
        const token = response.data.token;
        localStorage.setItem("token", token);

        if (response.data.isAdmin) {
          navigate("/Admin");
        } else {
          navigate("/users", {
            state: { registrationno: registration },
          });
        }
      } else {
        handleLogoutOperations();
        setLoginError("Email or password is incorrect. Please try again.");
      }
    } catch (error) {
      handleLogoutOperations();
      console.error("Error logging in:", error);
    }

    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
      setLoginError("Email or password is incorrect. Please try again.");
    }, 100);
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async () => {
    setForgotPasswordError(null);
    const registration = forgotPasswordRegistrationRef.current.value;
    setId(registration);

    try {
      const response = await axios.post(
        "http://localhost:3000/forgot-password",
        {
          registration,
        }
      );

      if (response.data.success) {
        if (response.data.userExists) {
          setShowUpdatePasswordModal(true);
          setShowForgotPasswordModal(false);
        } else {
          setForgotPasswordError("Registration number not found.");
        }
      } else {
        setForgotPasswordError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error checking registration number:", error);
      setForgotPasswordError("An error occurred. Please try again later.");
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setForgotPasswordError("New password and confirm password do not match.");
      return;
    }

    const registration = id;

    try {
      const response = await axios.post(
        "http://localhost:3000/update-password",
        {
          registration,
          newPassword,
        }
      );

      if (response.data.success) {
        setShowUpdatePasswordModal(false);
        setForgotPasswordError("");
        setConfirmPassword("");
        setNewPassword("");
        toast.success("Password updated successfully."); // Notify success
      } else {
        setForgotPasswordError(
          response.data.error || "An error occurred. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setForgotPasswordError("An error occurred. Please try again later.");
    }
  };

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
          <Typography>
            <GroupsOutlinedIcon fontSize="large" />
          </Typography>
          <Typography className="opacity-70">Login to your account</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <Box mb={1}>
              <TextField
                type="RegistrationNo"
                name="RegistrationNo"
                variant="outlined"
                label="Username"
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
                label="Password"
                color="secondary"
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
          <Typography variant="body2" align="center" gutterBottom>
            Forgot password?{" "}
            <span
              onClick={handleForgotPassword}
              style={{ color: "#673AB7", cursor: "pointer" }}
            >
              Click here
            </span>
          </Typography>
        </Grid>
      </Box>
      <Modal
        open={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        aria-labelledBy="forgot-password-modal-title"
        aria-describedBy="forgot-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            // border: "2px solid #000",
            // boxShadow: 50,
            p: 4,
          }}
        >
          <Typography
            id="forgot-password-modal-title"
            variant="h6"
            component="h2"
          >
            <SyncLockOutlinedIcon fontSize="large" /> Forgot Password
          </Typography>
          <Typography id="forgot-password-modal-description" sx={{ mt: 2 }}>
            Please enter your registration number to reset your password.
          </Typography>
          {forgotPasswordError && (
            <Box mb={2} mt={1}>
              <Alert severity="error">{forgotPasswordError}</Alert>
            </Box>
          )}
          <TextField
            label="Registration Number"
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            inputRef={forgotPasswordRegistrationRef}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleForgotPasswordSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      <Modal
        open={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
        aria-labelledBy="update-password-modal-title"
        aria-describedBy="update-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            // border: "2px solid #000",
            // boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="update-password-modal-title"
            variant="h6"
            component="h2"
          >
            <BrowserUpdatedOutlinedIcon /> Update Password
          </Typography>
          <Typography id="update-password-modal-description" sx={{ mt: 2 }}>
            Enter a new password for your account.
          </Typography>
          {forgotPasswordError && (
            <Box mb={2} mt={1}>
              <Alert severity="error">{forgotPasswordError}</Alert>
            </Box>
          )}
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={newPassword}
            color="secondary"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            color="secondary"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </Box>
      </Modal>
      <ToastContainer /> {/* Place this at the end of your component */}
    </Box>
  );
};
export default LoginPage;
