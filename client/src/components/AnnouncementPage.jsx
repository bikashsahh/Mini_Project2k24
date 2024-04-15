import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Link,
  Stack,
  Chip,
} from "@mui/material";
import axios from "axios";

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3000/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleDownload = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const isNew = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDiff = now.getTime() - createdAtDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 1;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#E3F2FD",
        p: 1,
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
        ALL ANNOUNCEMENTS
      </Typography>
      {announcements.map((announcement) => (
        <Box
          key={announcement.id}
          sx={{
            bgcolor: "#EDE7F6",
            color: "",
            p: 2,
            borderRadius: "20px",
            mb: 2,
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {isNew(announcement.created_at) && (
            <Chip
              label="New"
              color="error"
              variant="Text"
              size="medium"
              sx={{
                position: "absolute",
                top: "-12px",
                left: "-7px",
                // ml: "50%",
                maxWidth: "100px", // Add this line
                overflow: "hidden", // Add this line
                textOverflow: "ellipsis", // Add this line
                whiteSpace: "nowrap", // Add this line
              }}
            />
          )}
          <Box
            sx={{
              flex: 1, // Add this line
              overflow: "hidden", // Add this line
              textOverflow: "ellipsis", // Add this line
              whiteSpace: "nowrap", // Add this line
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, mr: 1 }}>
              {announcement.title}
            </Typography>
            <Typography>{announcement.description}</Typography>
          </Box>
          {announcement.file_path && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDownload(announcement.file_path)}
              >
                Download
              </Button>
              <Button variant="text">
                <Link
                  onClick={() => handleDownload(announcement.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </Link>
              </Button>
            </Stack>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AnnouncementPage;
