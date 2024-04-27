import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Input,
  CircularProgress,
  Snackbar,
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:3000/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSnackbarMessage("File uploaded successfully");
      setSnackbarSeverity("success");
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
      elevation={4} // Add elevation here
      p={4} // Add some padding
    >
      <Typography variant="h2" gutterBottom>
        Upload Student Data
      </Typography>
      <Box mb={2} color="secondary">
        <Input type="file" onChange={handleFileChange} />
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={!file || isUploading}
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
