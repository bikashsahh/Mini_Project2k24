import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Grid, Divider } from "@mui/material";

const UserDetails = () => {
  const { state } = useLocation();

  // Check if the state object has user data
  if (!state || Object.keys(state).length === 0) {
    return (
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#EDE7F6",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="body1">No user data available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#EDE7F6",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Name:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Enrollment Number:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.enrollment_number}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Email:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Course:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.course}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Year of Admission:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.year_of_admission}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Current Semester:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.current_semester}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Course Duration:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.course_duration} years</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Father's Name:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{state.father_name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
