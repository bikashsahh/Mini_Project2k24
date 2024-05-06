import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { saveAs } from "file-saver";
import HeaderNew from "../../ui/Heading";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toaster library
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const AnnouncementDeletePage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/announcements"
        );
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

  const handleOpenConfirmation = (announcementId) => {
    setSelectedAnnouncementId(announcementId);
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedAnnouncementId(null);
    setIsConfirmationOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(
        `https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/announcements/${selectedAnnouncementId}`
      );
      const updatedAnnouncements = announcements.filter(
        (announcement) => announcement.id !== selectedAnnouncementId
      );
      setAnnouncements(updatedAnnouncements);
      toast.success("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Error deleting announcement");
    } finally {
      handleCloseConfirmation();
    }
  };

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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleOpenConfirmation(params.id)}
        />,
      ],
    },
  ];

  return (
    <>
      <Box m="20px">
        <HeaderNew title="Announcements" subtitle="List of Announcements" />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={announcements}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
      <Dialog
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Announcement?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this announcement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Add the ToastContainer */}
    </>
  );
};

export default AnnouncementDeletePage;
