import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { addMessage } from "../../redux/Slice/message";
import { addMessage } from "../../../redux/Slice/message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const AdminMessageForm = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    // Fetch messages from the server when component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return; // Do not submit empty messages
    }
    try {
      // Send the message data to the server
      await axios.post("http://localhost:3000/messages", {
        message: newMessage,
      });
      // Dispatch action to add the message to Redux store
      dispatch(addMessage(newMessage));
      // Reset form input and focus
      setNewMessage("");
      formRef.current.reset();
      navigate("/Home");
    } catch (error) {
      console.error("Error adding message:", error);
      // Handle errors (e.g., display error message to the user)
    }
  };

  return (
    <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add a Message
      </Typography>
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
      <Button type="submit" variant="contained" color="secondary">
        Add Message
      </Button>
    </Box>
  );
};

export default AdminMessageForm;
