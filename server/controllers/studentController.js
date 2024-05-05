import db from "../database.js";

export const getStudentsList = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.registrationno, 
        s.name, 
        s.programme, 
        s.courses, 
        s.mobile, 
        s.email, 
        s.session,
        s.year,
        s.registrationno AS id 
      FROM 
        students s 
      WHERE 
        s.isadmin IS NULL OR s.isadmin = false
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAssignmentList = async (req, res) => {
  try {
    const query = `
      SELECT
        s.registrationno,
        s.name,
        s.programme,
        s.session,
        s.year,
        sub.course_name,
        sub.submitted_at,
        sub.file_path
      FROM
        students s
        LEFT JOIN submissions sub ON s.registrationno = sub.registrationno
      WHERE 
        s.isadmin IS NULL OR s.isadmin = false
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStudentProfile = async (req, res) => {
  const registrationno = req.query.registrationno;
  try {
    const result = await db.query(
      "SELECT * FROM students WHERE registrationno = $1",
      [registrationno]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStudentSubmissionsList = async (req, res) => {
  const registrationno = req.query.registrationno;

  try {
    const result = await db.query(
      `
        SELECT s.course_name, s.submitted_at, s.file_path
        FROM submissions s
        JOIN students st ON s.registrationno = st.registrationno
        WHERE st.registrationno = $1
        ORDER BY s.submitted_at DESC;
      `,
      [registrationno]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ error: "No submissions found" });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttendanceSheet = async (req, res) => {
  try {
    const result = await db.query(
      `
        SELECT
          s.registrationno,
          s.name,
          s.programme,
          NULL AS signature,
          NULL AS remark
        FROM students s
        WHERE s.isadmin IS NULL OR s.isadmin = false
        ORDER BY s.registrationno;
      `
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching attendance sheet data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
