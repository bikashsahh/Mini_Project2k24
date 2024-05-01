import express from "express";
import formidable from "formidable";
import db from "./database.js";
import pinataSDK from "@pinata/sdk";
import fs  from "fs";
import env from "dotenv";
env.config();
const app = express();

import pinata from pinataSDK('process.env.PINATA_API_KEY', 'process.env.PINATA_API_SECRET');


app.get('/courses', async (req, res) => {
  try {
    const client = await db.connect();
    const result = await client.query('SELECT id, course_name FROM courses');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.post('/assignments', async (req, res) => {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      const { courseId } = fields;
      const file = files.file;

      const client = await pool.connect();

      // Check if the course exists
      const courseResult = await client.query('SELECT id FROM courses WHERE id = $1', [courseId]);
      if (courseResult.rows.length === 0) {
        client.release();
        return res.status(400).json({ error: 'Invalid course ID' });
      }

      // Upload the file to Pinata
      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.filepath));

      const pinataResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: 'process.env.PINATA_API_KEY',
          pinata_secret_api_key: 'process.env.PINATA_API_SECRET',
        },
      });

      const fileHash = pinataResponse.data.IpfsHash;
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileHash}`;

      // Insert the submission into the database
      const insertQuery = {
        text: 'INSERT INTO submissions (student_id, assignment_id, file_path) VALUES ($1, $2, $3)',
        values: [/* student_id */, /* assignment_id */, fileUrl],
      };
      await client.query(insertQuery);

      client.release();
      res.json({ message: 'Assignment submitted successfully', fileUrl });
    });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});

// app.post('/assignments', async (req, res) => {
//   try {
//     const form = formidable({ multiples: true });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form data:', err);
//         return res.status(500).json({ error: 'Failed to parse form data' });
//       }

//       const { courseId } = fields;
//       const file = files.file;

//       const client = await db.connect();

//       // Check if the course exists
//       const courseResult = await client.query('SELECT id FROM courses WHERE id = $1', [courseId]);
//       if (courseResult.rows.length === 0) {
//         client.release();
//         return res.status(400).json({ error: 'Invalid course ID' });
//       }

//       // Upload the file to IPFS and Pinata
//       const readableStreamForFile = fs.createReadStream(file.filepath);
//       const options = {
//         pinataMetadata: {
//           name: file.originalFilename,
//         },
//       };
//       const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
//       const fileHash = result.IpfsHash;
//       const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileHash}`;

//       // Insert the submission into the database
//       const insertQuery = {
//         text: 'INSERT INTO submissions (student_id, assignment_id, file_path) VALUES ($1, $2, $3)',
//         values: [/* student_id */, /* assignment_id */, fileUrl],
//       };
//       await client.query(insertQuery);

//       client.release();
//       res.json({ message: 'Assignment submitted successfully', fileUrl });
//     });
//   } catch (error) {
//     console.error('Error submitting assignment:', error);
//     res.status(500).json({ error: 'Failed to submit assignment' });
//   }
// });