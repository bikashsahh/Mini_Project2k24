import React, { useState, useEffect, useRef } from "react";
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

const AdminMessageForm = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/messages"
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/messages",
        {
          message: newMessage,
        }
      );
      // dispatch(addMessage(newMessage));
      setNewMessage("");
      formRef.current.reset();
      toast.success("Message sent successfully!"); // Show success notification
    } catch (error) {
      toast.error("Failed to send message. Please try again."); // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the message field is filled
  const isMessageFilled = newMessage.trim() !== "";

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
        Highlighting Messages
      </Typography>
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 400 }}
      >
        <TextField
          label="Enter your message"
          variant="outlined"
          value={newMessage}
          onChange={handleInputChange}
          color="secondary"
          fullWidth
          required
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!isMessageFilled || isLoading}
            startIcon={isLoading && <CircularProgress size={24} />}
          >
            {isLoading ? "Adding Message..." : "Add Message"}
          </Button>
        </Box>
      </Box>
      <ToastContainer /> {/* Add the ToastContainer */}
    </Box>
  );
};

export default AdminMessageForm;
