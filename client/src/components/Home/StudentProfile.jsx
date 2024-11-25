import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentProfileForm = () => {
  const [registrationno, setRegistrationno] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFormSubmit = async () => {
    if (registrationno && emailAddress) {
      try {
        const response = await axios.post(
          "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/check-status",
          { registrationno, emailAddress }
        );
        if (response.data.error) {
          setError(response.data.error);
          setIsFormValid(false);
        } else {
          setIsFormValid(true);
          navigate("/UserDetails", { state: response.data });
        }
      } catch (error) {
        setError("No user found.");
        setIsFormValid(false);
      }
    } else {
      setError("Please fill in both fields.");
      setIsFormValid(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: theme.shadows[5],
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "white",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* Image Section */}
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src="student.jpeg"
              alt="Student"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.9)",
              }}
            />
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Student Profile
            </Typography>
            <TextField
              label="Enrollment Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={registrationno}
              onChange={(e) => setRegistrationno(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.grey[400],
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.grey[600],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.grey[400],
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.grey[600],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            {!isFormValid && error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "1rem",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Check Status
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentProfileForm;
