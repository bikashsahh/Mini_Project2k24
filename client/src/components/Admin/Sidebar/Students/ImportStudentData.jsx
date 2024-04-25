import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";

const ImportStudentData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} disabled={!file}>
        Upload Excel
      </Button>
    </div>
  );
};

export default ImportStudentData;
