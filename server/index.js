import express from "express";
import cors from "cors";
import db from "./database.js";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import env from "dotenv";
import sendEmailToAllUsers from "./mailer.js";
import ExcelFile from "./excelFile.js";
import formidable from "formidable";
// import pinataSDK from "@pinata/sdk";
import fs from "fs";
import axios from "axios";
env.config();

const app = express();
const port = 3000;

// ---------------------------------------------
//for student details uploading.
const uploads = multer({ storage: multer.memoryStorage() });
// ---------------------------------------

// Multer setup for handling file uploads
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
// ---------------------------------------------------------------------------
app.post("/login", async (req, res) => {
  const { registration, password } = req.body;
  try {
    // Query the database to find a user with the provided email and password
    const result = await db.query(
      "SELECT * FROM students WHERE registrationno = $1 AND registrationno = $2",
      [registration, password] //password==registration no.
    );
    // If a user is found, send a success response
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        isAdmin: result.rows[0].isadmin,
      });
      // console.log("success");
      return;
    } else {
      // If no user is found, send an error response
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// ---------------------------Messages--------------------------//
// POST endpoint for adding messages
app.post("/messages", async (req, res) => {
  const { message } = req.body;
  try {
    // Insert new message into the database
    const result = await db.query(
      "INSERT INTO  messages (message_text) VALUES ($1) RETURNING *",
      [message]
    );

    // Send success response with inserted message data
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT id, message_text FROM messages");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("Internal Server Error");
  }
});
//--------------------------------------------------------//
// DELETE route to delete a message by ID
app.delete("/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  try {
    // Delete message from the database
    const deleteQuery = "DELETE FROM messages WHERE id = $1";
    const result = await db.query(deleteQuery, [messageId]);
    if (result.rowCount === 1) {
      res.status(200).json({ message: "Message deleted successfully" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -----------------------------ANNOUNCEMENTS---------------------------------------
// GET latest announcement
app.get("/announcements/latest", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM announcements ORDER BY id DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching latest announcement:", err);
    res.status(500).json({ error: "Error fetching latest announcement" });
  }
});

// GET all announcements
app.get("/announcements", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM announcements ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ error: "Error fetching announcements" });
  }
});

// POST route for creating announcements
app.post("/announcements", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    // Insert new announcement into the PostgreSQL database
    const queryText =
      "INSERT INTO announcements (title, description, file_path) VALUES ($1, $2, $3) RETURNING id";
    const values = [title, description, fileUrl];
    const result = await db.query(queryText, values);

    res.status(201).json({
      message: "Announcement created successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal server error" }); // Send an error response to the client
  }
});

// GET endpoint for downloading files
app.get("/announcements/download/:filePath", async (req, res) => {
  const { filePath } = req.params;
  try {
    // Send the file for download
    // /Users/bikashsah/Desktop/Mini_Project2k24/server/uploads
    res.download(path.join(__dirname, "../server/uploads", filePath), (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ error: "Error downloading file" });
      }
    });
  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).json({ error: "Error downloading file" });
  }
});

// -----------------------------------------------------------------------
// Add the new route for "Check Status"
// API endpoint to check user status
app.post("/check-status", async (req, res) => {
  const { registrationno, emailAddress } = req.body;

  try {
    // Query the database to find a user with the provided enrollment number and email
    const result = await db.query(
      "SELECT * FROM students WHERE registrationno = $1 AND email = $2",
      [registrationno, emailAddress]
    );

    if (result.rows.length > 0) {
      // If a user is found, send the user's details as a response
      res.status(200).json(result.rows[0]);
    } else {
      // If no user is found, send an error response
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// -----------------------------------------------------------------------
///nodemailer
app.post("/contact", async (req, res) => {
  // console.log(process.env.WORD, " ", process.env.EMAIL);
  const { name, email, message } = req.body;
  // console.log(name + " " + email + " " + message);
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Message from Contact Form",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
});

//--------------------------------------------------------------------------
app.get("list", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM students");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// =============================
// app.get('/sendmailtoallusers', sendEmailToAllUsers);
app.post("/sendmailtoallusers", sendEmailToAllUsers);

// ----------------------------------
app.post("/upload-excel", uploads.single("file"), ExcelFile);

//--------------------------------------------

app.get("/courses", async (req, res) => {
  try {
    const registrationno = req.query.registrationno;
    console.log("Registration No:", registrationno);

    let query = `
      SELECT courses
      FROM students
      WHERE registrationno = $1;
    `;
    const result = await db.query(query, [registrationno]);

    const courses = result.rows[0].courses;

    const courseList = courses.split(",");

    res.json(courseList);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.post("/assignments", async (req, res) => {
  try {
    const { registrationno } = req.query;
    const { selectedCourse, ImgHash } = req.body;

    // Check if required parameters are present
    if (!registrationno || !selectedCourse || !ImgHash) {
      return res.status(400).send("Missing parameters");
    }

    // Insert submission into the database
    const result = await db.query(
      "INSERT INTO submissions (registrationno, file_path, course_name) VALUES ($1, $2, $3)",
      [registrationno, ImgHash, selectedCourse]
    );

    console.log("Data inserted successfully");
    res.status(200).send("File uploaded and submission recorded");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error uploading file and recording submission");
  }
});
//-----------------------------------------
// Route to fetch student and submission data
app.get("/studentslist", async (req, res) => {
  try {
    const query = `
    SELECT s.registrationno, s.name, s.programme, s.courses, s.mobile, s.email, s.registrationno AS id 
    FROM students s 
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//-------------------------------------------
app.get("/assignmentlist", async (req, res) => {
  try {
    const query = `
      SELECT
        s.registrationno,
        s.name,
        s.programme,
        sub.course_name,
        sub.submitted_at,
        sub.file_path
      FROM
        students s
        LEFT JOIN submissions sub ON s.registrationno = sub.registrationno
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





//-------------------------------------------





//------------------------------profile--------------------------
// Route to fetch user data
app.get('/studentpro', async (req, res) => {
  try {
    const registrationno = req.query.registrationno;
    const query = `
      SELECT u.name, u.registrationno, u.programme, array_agg(c.name) AS courses, u.mobile, u.email
      FROM students u
      LEFT JOIN user_courses uc ON u.id = uc.user_id
      LEFT JOIN courses c ON uc.course_id = c.id
      WHERE u.registrationno = $1
      GROUP BY u.name, u.registrationno, u.programme, u.mobile, u.email
    `;
    const { rows } = await db.query(query, [registrationno]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//-------------------------------------------------------//




