import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, Button, Link } from "@mui/material";
import axios from "axios";

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch all announcements from the server
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        All Announcements
      </Typography>
      {announcements.map((announcement) => (
        <Box
          key={announcement.id}
          sx={{
            bgcolor: "#B39DDB",
            color: "",
            p: 2,
            borderRadius: "8px",
            mb: 2,
            width: "80%",
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            {announcement.title}
          </Typography>
          <Typography>{announcement.description}</Typography>
          {announcement.file_path && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDownload(announcement.file_path)}
              >
                Download File
              </Button>
              <Link
                onClick={() => handleDownload(announcement.file_path)}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ml: 2 }}
              >
                View File
              </Link>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AnnouncementPage;
