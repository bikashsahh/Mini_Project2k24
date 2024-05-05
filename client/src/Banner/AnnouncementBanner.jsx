import React, { useState, useEffect } from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnnouncementBanner = () => {
  const [announcement, setAnnouncement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest announcement from the server
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/announcements/latest"
        );
        setAnnouncement(response.data);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };
    fetchAnnouncement();
  }, []);

  const handleClick = () => {
    navigate("/AnnouncementPage");
  };

  return (
    <Stack
      justifyContent={"space-evenly"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#B39DDB",
        color: "black",
        p: 1.5,
        borderRadius: "8px",
        cursor: "pointer",
      }}
      // onClick={handleClick}
    >
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        onClick={handleClick}
        sx={{ alignContent: "center", p: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {/* <i className="fa fa-graduation-cap fa-3x" /> */}
          <Typography
            variant="contained"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              mt: -2,
            }}
          >
            Announcements
          </Typography>
          <Typography variant="subtitle1">
            Know The Latest Announcement with One Click.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AnnouncementBanner;
