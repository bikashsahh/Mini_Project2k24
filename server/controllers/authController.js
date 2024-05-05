import db from "../database.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { registration, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM students WHERE registrationno = $1 AND password = $2",
      [registration, password]
    );
    if (result.rows.length > 0) {
      const token = jwt.sign(
        {
          data: result.rows[0],
        },
        "bikashsah",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        success: true,
        message: "Login successful",
        isAdmin: result.rows[0].isadmin,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyStudent = (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(token, "bikashsah", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      if (token && decoded.data.isadmin === false) {
        res.status(200).json({ success: true, message: "Token verified" });
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyAdmin = (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(token, "bikashsah", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      if (token && decoded.data.isadmin === true) {
        res.status(200).json({ success: true, message: "Token verified" });
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { registration } = req.body;

  try {
    const query = `SELECT * FROM students WHERE registrationno = '${registration}'`;
    const result = await db.query(query);

    if (result.rows.length > 0) {
      res.json({ success: true, userExists: true });
    } else {
      res.json({ success: true, userExists: false });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ success: false, error: "An error occurred." });
  }
};

export const updatePassword = async (req, res) => {
  const { registration, newPassword } = req.body;

  try {
    const query = `UPDATE students SET password = '${newPassword}' WHERE registrationno = '${registration}'`;
    const result = await db.query(query);

    if (result.rowCount > 0) {
      res.json({ success: true, message: "Password updated successfully." });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ success: false, error: "An error occurred." });
  }
};

export const checkUserStatus = async (req, res) => {
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
};
