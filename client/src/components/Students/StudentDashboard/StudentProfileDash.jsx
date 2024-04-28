import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationno = location.state?.registrationno || "";
  const [studentData, setStudentData] = useState(null);

  console.log("registrationno:", registrationno); // Corrected console log

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data from the server based on the registrationno
        const response = await axios.get(
          `http://localhost:3000/studentsprofile?registrationno=${registrationno}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        // Handle error if needed
      }
    };
    fetchData();
  }, [registrationno]);

  const handleNavigateToUserDetails = () => {
    if (studentData) {
      navigate("/UserDetails", { state: { studentData } });
    }
  };

  return (
    <>
      <div>Profile</div>
      {/* Render your profile page content here */}
      <Button variant="contained" onClick={handleNavigateToUserDetails}>
        button
      </Button>
    </>
  );
}

export default ProfilePage;
