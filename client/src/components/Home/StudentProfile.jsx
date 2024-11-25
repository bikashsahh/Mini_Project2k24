import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
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
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          maxWidth: '1200px',
          boxShadow: 24,
          borderRadius: 4,
          overflow: 'hidden',
          background: 'white'
        }}
      >
        {/* Image Section */}
        <Box 
          sx={{ 
            width: isMobile ? '100%' : '50%', 
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src="student.jpeg"
            alt="Student"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9)'
            }}
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
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
              backgroundImage: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)'
            }}
          >
            Check Status
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfileForm;