import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Chip,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { saveAs } from "file-saver";
import { ColorModeContext, useMode } from "../../theme";
import { useTheme } from "@mui/material";
import HeaderNew from "../Admin/DashboardNew/HeaderNew";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

const AnnouncementPage = () => {
  const [themes, colorMode] = useMode();
  const theme = useTheme();
  const colors = theme.palette.mode;
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
      headerName: "Download",
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            params.row.file_path ? (
              <IconButton onClick={() => downloadFile(params.row.file_path)}>
                <DownloadIcon />
              </IconButton>
            ) : (
              <span>File not available</span>
            )
          }
          label="Download"
          disabled={!params.row.file_path}
        />,
      ],
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

  const downloadFile = (filePath) => {
    saveAs(filePath)
      .then(() => console.log("File downloaded successfully"))
      .catch((error) => console.error("Error downloading file:", error));
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
          <HeaderNew title="Announcements" subtitle="List of Announcements" />
          <Box m="40px 0 0 0" height="75vh">
            <DataGrid
              rows={announcements}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.created_at}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AnnouncementPage;
