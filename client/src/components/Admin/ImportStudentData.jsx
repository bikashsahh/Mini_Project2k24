import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Input,
  CircularProgress,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ImportStudentData = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [session, setSession] = useState("");
  const [year, setYear] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("session", session);
    formData.append("year", year);

    try {
      await axios.post(
        "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("File uploaded successfully");
      setSnackbarSeverity("success");
      resetForm();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setSnackbarMessage("File already exists");
        setSnackbarSeverity("warning");
      } else {
        setSnackbarMessage("Error uploading file");
        setSnackbarSeverity("error");
        console.error("Error uploading file:", err);
      }
    } finally {
      setIsUploading(false);
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setFile(null);
    setSession("");
    setYear("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      elevation={4}
      p={4}
    >
      <Typography variant="h2" gutterBottom>
        Upload Student Data
      </Typography>
      <Box mb={2} color="secondary">
        <Input type="file" onChange={handleFileChange} />
        {/* {!file && <Typography variant="body1">No file chosen</Typography>} */}
      </Box>
      <Box mb={2} display="flex" alignItems="center">
        <FormControl sx={{ mr: 2 }}>
          <InputLabel id="session-label" color="secondary">
            Session
          </InputLabel>
          <Select
            labelId="session-label"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            label="session"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Select Session</MenuItem>
            <MenuItem value="January-June">January-June</MenuItem>
            <MenuItem value="July-December">July-December</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="year-label" color="secondary">
            Year
          </InputLabel>
          <Select
            labelId="year-label"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Select Year</MenuItem>
            {Array.from({ length: 26 }, (_, i) => (
              <MenuItem key={i} value={2015 + i}>
                {2015 + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={!file || isUploading || !session || !year}
        >
          Upload Excel
        </Button>
        {isUploading && (
          <CircularProgress size={24} style={{ marginLeft: 16 }} />
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImportStudentData;
