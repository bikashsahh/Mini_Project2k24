import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

function SendEmailsButton() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true); // Set loading state to true before sending emails

    try {
      await axios
        .post("http://localhost:3000/sendmailtoallusers", { subject, body })
        .then((res) => {
          toast.success("Emails sent successfully!");
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error in sending mail to all users:", err.message);
          toast.error("Error sending emails. Please try again.");
        })
        .finally(() => {
          setIsLoading(false); // Set loading state to false after the email sending process is complete
        });
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Error sending emails. Please try again.");
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Send Email to Students
        </Typography>
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disableElevation
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Emails to All Users"
            )}
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default SendEmailsButton;
