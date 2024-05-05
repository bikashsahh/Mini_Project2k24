import db from "../database.js";

export const submitAssignment = async (req, res) => {
  try {
    const { registrationno } = req.query;
    const { selectedCourse, ImgHash } = req.body;

    if (!registrationno || !selectedCourse || !ImgHash) {
      return res.status(400).send("Missing parameters");
    }

    const existingSubmission = await db.query(
      "SELECT * FROM submissions WHERE registrationno = $1 AND course_name = $2",
      [registrationno, selectedCourse]
    );

    if (existingSubmission.rows.length > 0) {
      await db.query(
        "UPDATE submissions SET file_path = $1 WHERE registrationno = $2 AND course_name = $3",
        [ImgHash, registrationno, selectedCourse]
      );
    } else {
      await db.query(
        "INSERT INTO submissions (registrationno, file_path, course_name) VALUES ($1, $2, $3)",
        [registrationno, ImgHash, selectedCourse]
      );
    }

    // console.log("Assignment submitted successfully");
    res.status(200).send("Assignment submitted successfully");
  } catch (err) {
    console.error("Error submitting assignment:", err);
    res.status(500).send("Error submitting assignment");
  }
};
