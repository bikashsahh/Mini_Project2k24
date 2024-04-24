import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";

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
    } catch (error) {
      console.error("Error creating announcement:", error);
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
        // bgcolor: "#E3F2FD",
        justifyContent: "center",
        p: 2,
        mt: "10%",
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
          mb: 3,
        }}
      >
        Make a Announcement
      </Typography>
      <Box
        sx={{
          bgcolor: "#EDE7F6",
          color: "",
          p: 2,
          borderRadius: "20px",
          mb: 2,
          width: "90%",
        }}
      >
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
    </Box>
  );
};

export default AdminAnnouncementPage;
