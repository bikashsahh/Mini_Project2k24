import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import UserDetails from "./UserDetails";

const StudentProfileForm = () => {
  const [registrationno, setRegistrationno] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    // Validate the form fields
    if (registrationno && emailAddress) {
      try {
        const response = await axios.post(
          "http://localhost:3000/check-status",
          {
            registrationno,
            emailAddress,
          }
        );

        // Check if the user was found
        if (response.data.error) {
          setError(response.data.error);
          setIsFormValid(false);
        } else {
          setIsFormValid(true);
          navigate("/UserDetails", { state: response.data });
        }
      } catch (error) {
        setError("No user Find");
        setIsFormValid(false);
      }
    } else {
      setError("Please fill in the Registration Number and Email Address.");
      setIsFormValid(false);
    }
  };

  const handleButtonClick = () => {
    handleFormSubmit();
  };

  return (
    <Grid container sx={{ mt: 10 }}>
      <Grid item xs={6}>
        <Box p={4}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
            }}
            gutterBottom
          >
            Student Profile
          </Typography>
          <TextField
            label="Enrollment Number"
            variant="outlined"
            color="secondary"
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
            color="secondary"
            fullWidth
            required
            margin="normal"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          {!isFormValid && error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error ||
                "Please fill in the Registration Number and Email Address."}
            </Alert>
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleButtonClick}
            >
              Check Status
            </Button>
          </Box>
        </Box>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={5} sx={{ ml: 8, mb: 5 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img
            className="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto rounded-5"
            src="student.jpeg"
            alt="Image"
            width="500"
            height="500"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudentProfileForm;
