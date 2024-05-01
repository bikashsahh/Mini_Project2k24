import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAnnouncementPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/announcements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server response:", response.data);
      setTitle("");
      setDescription("");
      setFile(null);
      toast.success("Announcement created successfully!"); // Show success notification
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement. Please try again."); // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          padding: "0.5rem 1rem",
          mb: 1,
        }}
      >
        Make a Announcement
      </Typography>
      <Box sx={{ p: 2, borderRadius: "20px", mb: 2, width: "90%" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              color="secondary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
            />
            <input type="file" onChange={handleFileChange} required />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Create Announcement"
              )}
            </Button>
          </Stack>
        </form>
      </Box>
      <ToastContainer /> {/* Add the ToastContainer */}
    </Box>
  );
};

export default AdminAnnouncementPage;
