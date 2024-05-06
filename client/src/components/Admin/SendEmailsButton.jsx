import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const SendEmailsButton = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [session, setSession] = useState("");
  const [year, setYear] = useState("");
  const handleProgrammeChange = (event) => {
    setProgramme(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSessionChange = (event) => {
    setSession(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/sendmailtoselectedusers", {
          subject,
          body,
          programme,
          semester,
          session,
          year,
        })
        .then((res) => {
          toast.success("Emails sent successfully!");
          resetForm();
        })
        .catch((err) => {
          toast.error("Error sending emails. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Error sending emails. Please try again.");
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSubject("");
    setBody("");
  };

  // Check if both subject and body fields are filled
  const isFormFilled = subject.trim() !== "" && body.trim() !== "";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      p={4}
      elevation={4}
    >
      <Typography variant="h2" gutterBottom>
        Send Email to Students
      </Typography>
      <TextField
        label="Subject"
        variant="outlined"
        color="secondary"
        fullWidth
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Body"
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
        required
      />
      {/* <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
        <Box mr={2}>
          <label>Programme:</label>
          <select value={programme} onChange={handleProgrammeChange}>
            <option value="">Select Programme</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="PGDCA">PGDCA</option>
            <option value="CIT">CIT</option>
          </select>
        </Box>
        <Box mr={2}>
          <label>Semester:</label>
          <select value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {programme === "BCA" || programme === "MCA" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </>
            ) : programme === "PGDCA" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
              </>
            ) : programme === "CIT" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </>
            ) : null}
          </select>
        </Box>
        <Box mr={2}>
          <label>Session:</label>
          <input
            type="text"
            value={session}
            onChange={handleSessionChange}
            placeholder="Enter Session"
          />
        </Box>
        <Box>
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="Enter Year"
          />
        </Box>
      </Box> */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
        <Box mr={2}>
          <label>Programme:</label>
          <select value={programme} onChange={handleProgrammeChange}>
            <option value="">Select Programme</option>
            <option value="BCA">BCA</option>
            <option value="MCA_NEW">MCA_NEW</option>
            <option value="PGDCA_NEW">PGDCA_NEW</option>
            <option value="CIT">CIT</option>
          </select>
        </Box>
        <Box mr={2}>
          <label>Semester:</label>
          <select value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {programme === "BCA" || programme === "MCA_NEW" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </>
            ) : programme === "PGDCA_NEW" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
              </>
            ) : programme === "CIT" ? (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </>
            ) : null}
          </select>
        </Box>
        <Box mr={2}>
          <label>Session:</label>
          <select value={session} onChange={handleSessionChange}>
            <option value="">Select Session</option>
            <option value="January-June">January-June</option>
            <option value="July-December">July-December</option>
          </select>
        </Box>
        <Box>
          <label>Year:</label>
          <select value={year} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {Array.from({ length: 2040 - 2015 + 1 }, (_, i) => 2015 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          disabled={!isFormFilled || isLoading}
          startIcon={isLoading && <CircularProgress size={24} />}
        >
          {isLoading ? "Sending Emails..." : "Send Emails to Selected Students"}
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default SendEmailsButton;
