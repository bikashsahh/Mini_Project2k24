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

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await axios
        .post("http://localhost:3000/sendmailtoallusers", { subject, body })
        .then((res) => {
          toast.success("Emails sent successfully!");
          console.log(res.data.message);
          resetForm();
        })
        .catch((err) => {
          console.log("Error in sending mail to all users:", err.message);
          toast.error("Error sending emails. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error sending emails:", error);
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          disabled={!isFormFilled || isLoading}
          startIcon={isLoading && <CircularProgress size={24} />}
        >
          {isLoading ? "Sending Emails..." : "Send Emails to All Users"}
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default SendEmailsButton;
