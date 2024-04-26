import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("courseId", selectedCourse);

      const response = await axios.post("/api/assignments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Assignment submitted:", response.data);
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setIsLoading(false);
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
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.id}>
            {course.course_name}
          </MenuItem>
        ))}
      </Select>
      <input type="file" onChange={handleFileChange} />
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
