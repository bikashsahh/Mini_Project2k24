import xlsx from "xlsx";
import db from "./database.js";

// const sendEmailToAllUsers = async (req, res) => {
const ExcelFile = async (req, res) => {
  try {
    const { buffer } = req.body;
    console.log("argadg", buffer);
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Insert data into PostgreSQL database
    const client = await db.connect();
    for (const row of data) {
      const query =
        "INSERT INTO studentsinformation (registrationno,name,programme,courses,mobile,email) VALUES ($1, $2,$3,$4,$5,$6)";
      const values = [
        row.registrationno,
        row.name,
        row.programme,
        row.courses,
        row.mobile,
        row.email,
      ];
      await client.query(query, values);
    }
    client.release();

    res.status(200).json({ message: "Excel data uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading Excel data" });
  }
};

export default ExcelFile;
