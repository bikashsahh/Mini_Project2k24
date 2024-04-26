import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const AssignmentForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const registrationno = location.state?.registrationno || "";
  const [fileName, setFileName] = useState("No image selected");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/courses?registrationno=${registrationno}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [registrationno]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    // console.log("course: ", selectedCourse);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `91f013fa4929ab908af2`,
            pinata_secret_api_key: `918c20b6d1338f77fb5844b2d001fbccdb9a1188a85c5bb9bee4d0f28794e8de`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash =
          "https://gateway.pinata.cloud/ipfs/" + resFile.data.IpfsHash;
        // const ImgHash=`ipfs://${resFile.data.IpfsHash}`;
        setFileUrl(ImgHash);

        try {
          const fileData = {
            selectedCourse: selectedCourse,
            ImgHash: ImgHash,
          };
          const response = await axios.post(
            `http://localhost:3000/assignments?registrationno=${registrationno}`,
            fileData
          );
          console.log("Succesfully Submitted");
        } catch (error) {
          console.log("Error in form submitting:", error);
        }
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    setFile(null);
  };

  const handleFileChange = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Select
        value={selectedCourse}
        onChange={handleCourseChange}
        sx={{ mb: 2, width: 300 }}
      >
        <MenuItem value="">Select a course</MenuItem>
        {courses.map((course, index) => (
          <MenuItem key={index} value={course}>
            {course}
          </MenuItem>
        ))}
      </Select>
      <input
        type="file"
        id="file-upload"
        name="data"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!selectedCourse || !file || isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default AssignmentForm;
