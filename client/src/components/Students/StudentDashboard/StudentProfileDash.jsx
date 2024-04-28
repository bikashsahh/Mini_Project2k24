import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
// const location = useLocation();
// const registrationno = location.state?.registrationno || "";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/studentpro?registrationno=${registrationno}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data. Please try again later.");
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [registrationno]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : userData ? (
        <>
          <Typography variant="h5" gutterBottom>
            Student Profile
          </Typography>
          <Typography variant="body1">Name: {userData.name}</Typography>
          <Typography variant="body1">
            Registration Number: {userData.registrationno}
          </Typography>
          <Typography variant="body1">Program: {userData.programme}</Typography>
          <Typography variant="body1">Courses:</Typography>
          <ul>
            {userData.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          <Typography variant="body1">Mobile: {userData.mobile}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
        </>
      ) : (
        <Typography variant="body1">No user data found.</Typography>
      )}
      <ToastContainer />
    </Box>
  );
};

export default ProfilePage;