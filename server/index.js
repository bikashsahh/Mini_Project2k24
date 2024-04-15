import express from "express";
import cors from "cors";
import db from "./database.js";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import env from "dotenv";
// import { google } from "googleapis";

const app = express();
const port = 3000;
env.config();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
//
// ---------------------------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Query the database to find a user with the provided email and password
    const result = await db.query(
      "SELECT * FROM users2 WHERE email = $1 AND password = $2",
      [email, password]
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
  const { enrollmentNumber, emailAddress } = req.body;

  try {
    // Query the database to find a user with the provided enrollment number and email
    const result = await db.query(
      "SELECT * FROM users2 WHERE enrollment_number = $1 AND email = $2",
      [enrollmentNumber, emailAddress]
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

// ----------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//-------------------------------------------------------//
