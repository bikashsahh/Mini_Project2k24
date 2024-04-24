import React, { useState } from 'react';
import axios from "axios";


const FileUploadForm = () => {
  const [file, setFile] = useState(null);

 
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    console.log(file)

    try {

      const response = await axios.post('http://localhost:3000/upload', formData);
      if (response.ok) {
        console.log('File uploaded and data inserted into the database');
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;