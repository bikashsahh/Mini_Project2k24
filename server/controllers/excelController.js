import xlsx from "xlsx";
import db from "../database.js";

export const ExcelFile = async (req, res) => {
  try {
    const { session, year } = req.body;
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const query = `
      INSERT INTO students (registrationno, name, programme, courses, mobile, email, semester, session, year,password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)
    `;

    for (const row of data) {
      const lastLetter = row.programme.slice(-1);
      const semesterValue = isNaN(lastLetter) ? "1" : lastLetter;
      console.log(row.programme, lastLetter, semesterValue);
      const updatedProgramme = isNaN(lastLetter)
        ? `${row.programme}1`
        : row.programme;

      await db.query(query, [
        row.registrationno,
        row.name,
        updatedProgramme,
        row.courses,
        row.mobile,
        row.email,
        semesterValue,
        session,
        year,
        row.registrationno,
      ]);
    }

    res.status(200).send("File uploaded and data saved to database");
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
};
