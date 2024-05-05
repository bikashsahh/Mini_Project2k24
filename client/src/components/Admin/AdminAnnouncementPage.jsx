import React, { useRef, useState } from "react";
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
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `91f013fa4929ab908af2`,
            pinata_secret_api_key: `918c20b6d1338f77fb5844b2d001fbccdb9a1188a85c5bb9bee4d0f28794e8de`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash =
          "https://gateway.pinata.cloud/ipfs/" + resFile.data.IpfsHash;
        setFileUrl(ImgHash);

        try {
          const fileData = {
            title: title,
            description: description,
            ImgHash: ImgHash,
          };
          const response = await axios.post(
            `http://localhost:3000/announcements`,
            fileData
          );
          toast.success("Announcement Created successfully!");
          resetForm();
        } catch (error) {
          console.log("Error in announcement creation:", error);
          toast.error("Error creating announcement. Please try again.");
        }
      } catch (e) {
        toast.error("Unable to upload file to Pinata");
      }
    } else {
      toast.error("Please select a file to upload.");
    }

    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setFileName("No files selected");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            <input
              type="file"
              ref={fileInputRef}
              id="file-upload"
              name="data"
              onChange={handleFileChange}
              required
            />
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
