import React, { useState, useEffect, useRef } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentForm = ({ registrationno }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();
  // const registrationno = location.state?.registrationno || "";
  const [fileName, setFileName] = useState("No image selected");
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef(null); // Ref for file input element

  console.log("asss", registrationno);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/courses?registrationno=${registrationno}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses. Please try again later.");
      }
    };
    fetchCourses();
  }, [registrationno]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
          console.log("Successfully Submitted");
          toast.success("Assignment submitted successfully!");
          resetForm(); // Reset the form
        } catch (error) {
          console.log("Error in form submitting:", error);
          toast.error("Error submitting assignment. Please try again.");
        }
      } catch (e) {
        toast.error("Unable to upload image to Pinata");
      }
    } else {
      toast.error("Please select a file to upload.");
    }

    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const resetForm = () => {
    setSelectedCourse("");
    setFile(null);
    setFileName("No image selected");
    // Clear file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      {/* Add ref to file input */}
      <input
        type="file"
        ref={fileInputRef}
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
      <ToastContainer />
    </Box>
  );
};

export default AssignmentForm;
