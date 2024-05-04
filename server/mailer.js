import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import db from "./database.js";

async function sendEmail(email, name, subject, body) {
  try {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.WORD,
        },
      })
    );

    console.log("email sent ", email);

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #1a1a1a; /* Dark background color */
              color: #fff; /* Text color */
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff; /* Container background color */
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
          }
          h2, h3 {
              color: black;
              text-align: center; /* Center align heading */
          }
          
          .logo {
              text-align: center;
              margin-bottom: 20px;
          }
          
      </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                  <img src="http://ignou.ac.in/images/logo.png" alt="Logo" style="height: 80px;">
              </div>
              <h2>Hello👋, ${name} </h2>
              <h3>MNNIT-IGNOU</h3>
              <h2>${body} </h2>
          </div>
      </body>
      </html>
      `,
    });

    return "success";
  } catch (error) {
    return error.message;
  }
}

// const sendEmailToAllUsers = async (req, res) => {
//   try {
//     const { subject, body } = req.body;
//     const { rows } = await db.query("SELECT name, email FROM students");
//     const usersWithEmailAndName = rows.map((user) => ({
//       name: user.name,
//       email: user.email,
//     }));

//     for (const user of usersWithEmailAndName) {
//       try {
//         const result = await sendEmail(user.email, user.name, subject, body);
//         console.log(result);
//       } catch (err) {
//         console.log("Error in mail function", err.message);
//       }
//     }

//     return res.json({
//       status: "success",
//       message: "Mail sent to all!",
//     });
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const sendEmailToSelectedUsers = async (req, res) => {
  try {
    let { subject, body, programme, semester, session, year } = req.body; // Changed const to let
    const updatedProgramme = programme + semester;
    programme = updatedProgramme;
    const { rows } = await db.query(
      "SELECT name, email FROM students WHERE programme = $1 AND session = $2 AND year = $3",
      [programme, session, year]
    );

    console.log("server--->", session, year);
    const usersWithEmailAndName = rows.map((user) => ({
      name: user.name,
      email: user.email,
    }));

    for (const user of usersWithEmailAndName) {
      try {
        const result = await sendEmail(user.email, user.name, subject, body);
        console.log("server---->", result);
      } catch (err) {
        console.log("Error in mail function", err.message);
      }
    }

    return res.json({
      status: "success",
      message: "Mail sent to selected students!",
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default sendEmailToSelectedUsers;
