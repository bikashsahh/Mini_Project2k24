import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Chip,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
import { tokens, ColorModeContext, useMode } from "../../theme";
import { useTheme } from "@mui/material";
import HeaderNew from "../Admin/DashboardNew/HeaderNew";
// import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import Topbar from "../Admin/Sidebar/topbar";
const AnnouncementPage = () => {
  const [themes, colorMode] = useMode();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [announcements, setAnnouncements] = useState([]);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: (params) =>
        params.value ? params.value : <span>No description</span>,
    },
    {
      field: "file_path",
      headerName: "File",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <IconButton onClick={() => handleDownload(params.value)}>
            <DownloadIcon />
          </IconButton>
        ) : (
          <span>No file</span>
        ),
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "isNew",
      headerName: "New",
      flex: 1,
      renderCell: (params) => (
        <>
          {isNew(params.row.created_at) && (
            <Chip label="New" color="error" variant="outlined" size="small" />
          )}
        </>
      ),
    },
  ];

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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <Box m="20px">
          {/* <Topbar></Topbar> */}
          <HeaderNew title="Announcements" subtitle="List of Acoouncements" />
          <Box m="40px 0 0 0" height="75vh">
            <DataGrid
              rows={announcements}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AnnouncementPage;
