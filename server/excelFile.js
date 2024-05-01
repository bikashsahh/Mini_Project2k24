import xlsx from "xlsx";
import db from "./database.js";
import express from "express";

const app = express();

const ExcelFile = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const query = `
      INSERT INTO students (registrationno, name, programme, courses, mobile, email, semester)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const row of data) {
      const lastLetter = row.programme.slice(-1);
      const semester = isNaN(lastLetter) ? "1" : lastLetter;

      await db.query(query, [
        row.registrationno,
        row.name,
        row.programme,
        row.courses,
        row.mobile,
        row.email,
        semester,
      ]);
    }

    res.status(200).send("File uploaded and data saved to database");
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
};

export default ExcelFile;
