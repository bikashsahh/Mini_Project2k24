import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/context";

function ProfilePage() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const { registrationno } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data from the server based on the registrationno
        const response = await axios.get(
          `http://localhost:3000/studentsprofile?registrationno=${registrationno}`
        );
        setStudentData(response.data);
        navigate("/UserDetails", { state: response.data });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [registrationno]);

  return <></>;
}

export default ProfilePage;
