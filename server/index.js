import express from "express";
import cors from "cors";
import db from "./database.js";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

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
// -----------------------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Query the database to find a user with the provided email and password
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    // If a user is found, send a success response
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        isAdmin: result.rows[0].isadmin,
      });
      console.log("success");
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
// -----------------------------------------------------------------//
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

    // console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/messages", async (req, res) => {
//   try {
//     const result = await db.query("SELECT message_text FROM messages");
//     const messages = result.rows.map((row) => row.message_text);
//     // console.log(messages);
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });
//--------------------------------------------------------//
// DELETE route to delete a message by ID
app.delete("/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  // console.log("Bikk", messageId);
  try {
    // Delete message from the database
    const deleteQuery = "DELETE FROM messages WHERE id = $1";
    const result = await db.query(deleteQuery, [messageId]);
    // console.log("chutiya", result);
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

// ---------------------------------------------------------------------------------------
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
  console.log("gfhfh" + filePath);
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

// // POST new announcement
// app.post("/announcements", async (req, res) => {
//   const { title, description } = req.body;
//   // console.log(title + " " + description);
//   try {
//     await db.query(
//       "INSERT INTO announcements (title, description) VALUES ($1, $2)",
//       [title, description]
//     );
//     res.status(201).json({ message: "Announcement created" });
//   } catch (err) {
//     console.error("Error creating announcement:", err);
//     res.status(500).json({ error: "Error creating announcement" });
//   }
// });
// ----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//-------------------------------------------------------//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async function (request, accessToken, refreshToken, profile, done) {
//       console.log("Profile " + profile.id);
//       console.log("Profile " + profile.email);

//       try {
//         const dbdata = await db.query("select * from users where email=$1", [
//           profile.email,
//         ]);
//         if (dbdata.rows.length > 0) {
//           return done(null, dbdata.rows[0]);
//         } else {
//           return done(null);
//         }
//       } catch (error) {
//         console.log("Error in Google auth" + error);
//       }
//     }
//   )
// );

// app.get("auth/google/success", (req, res) => {
//   console.log("asdaewdaefa");
//   return;
// });
// app.get("/auth/google", (req, res) => {
//   console.log("asdaewdaefa");
//   return;
// });
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/auth/google/success", (req, res) => {
//   res.send("successfully logged in");
// });

// app.get("/auth/google/failure", (req, res) => {
//   // res.send("Unsuccessfull");
//   // res.status(401).json({ success: false, message: "Login unsuccessful" });
//   // return;
//   const data = {
//     success: false,
//   };
//   res.json(data);
// });

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });
// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

// --------------------------------------------------------------------------
// // import passport from "passport";
// // import session from "express-session";
// // import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// // import bodyParser from "body-parser";
// import express from "express";
// import cors from "cors";
// import db from "./database.js";

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors());

// app.post("/login", async (req, res) => {
//   // console.log(req.body);
//   const { email, password } = req.body;
//   console.log(email + " " + password);

//   try {
//     // Query the database to find a user with the provided email and password
//     const result = await db.query(
//       "SELECT * FROM users WHERE email = $1 AND password = $2",
//       [email, password]
//     );
//     // console.log(result.rows);
//     // If a user is found, send a success response
//     if (result.rows.length > 0) {
//       res.status(200).json({ success: true, message: "Login successful",  });
//       console.log("success");
//       return;
//     } else {
//       // If no user is found, send an error response
//       res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });
// // -----------------------------------------------------------------//
// // POST endpoint for adding messages
// app.post("/messages", async (req, res) => {
//   const { message } = req.body;
//   // console.log(message);
//   try {
//     // Insert new message into the database
//     const result = await db.query(
//       "INSERT INTO  messages (message_text) VALUES ($1) RETURNING *",
//       [message]
//     );

//     // Send success response with inserted message data
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error inserting message:", error);
//     res.status(500).json({ error: "Failed to add message" });
//   }
// });

// app.get("/messages", async (req, res) => {
//   // console.log("message called");
//   try {
//     const result = await db.query("SELECT id, message_text FROM messages");

//     console.log(result.rows);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // app.get("/messages", async (req, res) => {
// //   try {
// //     const result = await db.query("SELECT message_text FROM messages");
// //     const messages = result.rows.map((row) => row.message_text);
// //     // console.log(messages);
// //     res.status(200).json(messages);
// //   } catch (err) {
// //     console.error("Error fetching messages:", err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });
// //--------------------------------------------------------//
// // DELETE route to delete a message by ID
// app.delete("/messages/:id", async (req, res) => {
//   const messageId = req.params.id;
//   console.log("Bikk", messageId);
//   try {
//     // Delete message from the database
//     const deleteQuery = "DELETE FROM messages WHERE id = $1";
//     const result = await db.query(deleteQuery, [messageId]);
//     console.log("chutiya", result);
//     if (result.rowCount === 1) {
//       res.status(200).json({ message: "Message deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Message not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting message:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// //-------------------------------------------------------//
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static("public"));

// // app.use(
// //   session({
// //     secret: process.env.SESSION_SECRET,
// //     resave: false,
// //     saveUninitialized: true,
// //   })
// // );

// // app.use(passport.initialize());
// // app.use(passport.session());

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: process.env.GOOGLE_CLIENT_ID,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //       callbackURL: "http://localhost:3000/auth/google/callback",
// //       passReqToCallback: true,
// //     },
// //     async function (request, accessToken, refreshToken, profile, done) {
// //       console.log("Profile " + profile.id);
// //       console.log("Profile " + profile.email);

// //       try {
// //         const dbdata = await db.query("select * from users where email=$1", [
// //           profile.email,
// //         ]);
// //         if (dbdata.rows.length > 0) {
// //           return done(null, dbdata.rows[0]);
// //         } else {
// //           return done(null);
// //         }
// //       } catch (error) {
// //         console.log("Error in Google auth" + error);
// //       }
// //     }
// //   )
// // );

// // app.get("auth/google/success", (req, res) => {
// //   console.log("asdaewdaefa");
// //   return;
// // });
// // app.get("/auth/google", (req, res) => {
// //   console.log("asdaewdaefa");
// //   return;
// // });
// // app.get(
// //   "/auth/google",
// //   passport.authenticate("google", { scope: ["email", "profile"] })
// // );

// // app.get(
// //   "/auth/google/callback",
// //   passport.authenticate("google", {
// //     successRedirect: "/auth/google/success",
// //     failureRedirect: "/auth/google/failure",
// //   })
// // );

// // app.get("/auth/google/success", (req, res) => {
// //   res.send("successfully logged in");
// // });

// // app.get("/auth/google/failure", (req, res) => {
// //   // res.send("Unsuccessfull");
// //   // res.status(401).json({ success: false, message: "Login unsuccessful" });
// //   // return;
// //   const data = {
// //     success: false,
// //   };
// //   res.json(data);
// // });

// // passport.serializeUser((user, cb) => {
// //   cb(null, user);
// // });
// // passport.deserializeUser((user, cb) => {
// //   cb(null, user);
// // });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
