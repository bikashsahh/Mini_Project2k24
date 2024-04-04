// import passport from "passport";
// import session from "express-session";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email + " " + password);

  try {
    // Query the database to find a user with the provided email and password
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    console.log("KK", result.rows[0].isadmin);
    // console.log(result.rows);
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
  // console.log(message);
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
  // console.log("message called");
  try {
    const result = await db.query("SELECT id, message_text FROM messages");

    console.log(result.rows);
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
  console.log("Bikk", messageId);
  try {
    // Delete message from the database
    const deleteQuery = "DELETE FROM messages WHERE id = $1";
    const result = await db.query(deleteQuery, [messageId]);
    console.log("chutiya", result);
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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
