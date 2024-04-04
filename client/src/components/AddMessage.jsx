import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/Slice/message";
import axios from "axios";

const AdminMessageForm = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);

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
    } catch (error) {
      console.error("Error adding message:", error);
      // Handle errors (e.g., display error message to the user)
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMessage}
        onChange={handleInputChange}
        placeholder="Enter your message"
      />
      <button type="submit">Add Message</button>
    </form>
  );
};

export default AdminMessageForm;
