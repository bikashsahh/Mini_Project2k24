import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Error fetching messages");
      }
    };
    fetchMessages();
  }, []);

  const handleDeleteMessage = async () => {
    try {
      await axios.delete(`http://localhost:3000/messages/${selectedMessage}`);
      setMessages(messages.filter((message) => message.id !== selectedMessage));
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Error deleting message");
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  const handleOpenConfirmation = (messageId) => {
    setSelectedMessage(messageId);
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedMessage(null);
    setIsConfirmationOpen(false);
  };

  const columns = [
    { field: "message_text", headerName: "Message", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleOpenConfirmation(params.row.id)}
        >
          <DeleteIcon color="error" />
        </Button>
      ),
    },
  ];

  return (
    <Box m={4}>
      <Typography
        sx={{ fontSize: "40px" }}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        Messages List
      </Typography>
      <DataGrid
        rows={messages}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.id}
        autoHeight
      />
      <Dialog
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Message?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMessage} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default MessagesList;
