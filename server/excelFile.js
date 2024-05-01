import xlsx from "xlsx";
import db from "./database.js";
import express from "express";

const app = express();
const ExcelFile = async (req, res) => {
  try {
    // console.log("Received file:", req.file.buffer);
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Assuming you have a table named 'excel_data' with columns 'col1', 'col2', 'col3'
    const query =
      "INSERT INTO students (registrationno,name,programme,courses,mobile,email) VALUES ($1, $2,$3,$4,$5,$6)";
    for (const row of data) {
      await db.query(query, [
        row.registrationno,
        row.name,
        row.programme,
        row.courses,
        row.mobile,
        row.email,
      ]);
    }

    res.status(200).send("File uploaded and data saved to database");
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
};

export default ExcelFile;
