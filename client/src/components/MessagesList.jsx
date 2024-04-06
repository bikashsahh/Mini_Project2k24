import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteMessage from "./Admin/DeleteMessage";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages from the server
        const response = await axios.get("http://localhost:3000/messages");
        // Assuming the response data is an array of messages with `id` and `text` properties
        console.log("jjjjjj", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Handle errors (e.g., display error message to the user)
      }
    };

    fetchMessages();
  }, [messages]);

  return (
    <div>
      <h2>Messages List</h2>
      <ul>
        {messages.map((message, index) => (
          <>
            <li key={index}> {message.message_text} </li>
            <DeleteMessage key={message.id} id={message.id}></DeleteMessage>
          </>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
