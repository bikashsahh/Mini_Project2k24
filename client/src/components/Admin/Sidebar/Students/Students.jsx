import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

function Students() {
  const [students, setStudents] = useState([]);

  const handleCall = (mobileNumber) => {
    window.location.href = `tel:${mobileNumber}`;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Student Information
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(students) &&
              students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.registrationno}</TableCell>
                  <TableCell>{student.programme}</TableCell>
                  <TableCell>{student.registrationno}</TableCell>
                  <TableCell>{student.courses}</TableCell>
                  <TableCell>
                    <Link
                      href={`tel:${student.mobile}`}
                      onClick={() => handleCall(student.mobile)}
                    >
                      {student.mobile}
                    </Link>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Students;
