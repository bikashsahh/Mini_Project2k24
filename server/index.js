import express, { query } from "express";
import cors from "cors";
import env from "dotenv";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import excelRoutes from "./routes/excelRoutes.js";
import db from "./database.js";

const app = express();
const port = 3000;
env.config();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

//Routes
app.use("/", authRoutes);
app.use("/messages", messageRoutes);
app.use("/announcements", announcementRoutes);
app.use("/contact", contactRoutes);
app.use("/", emailRoutes);
app.use("/", excelRoutes);
app.use("/courses", courseRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/", studentRoutes);

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM messages");
  res.send(result.rows);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
