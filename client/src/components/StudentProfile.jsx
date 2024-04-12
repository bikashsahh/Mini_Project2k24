import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";

const StudentProfileForm = () => {
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
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            color="secondary"
            fullWidth
            margin="normal"
          />
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary">
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
          {/* <Avatar
            alt="Student Profile"
            src="img1.webp"
            sx={{ width: 300, height: 300 }}
          /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudentProfileForm;
