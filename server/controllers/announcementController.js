import db from "../database.js";

export const getAnnouncements = async (req, res) => {
  try {
    const query = `
      SELECT
        id,
        title,
        description,
        file_path,
        created_at
      FROM
        announcements
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, ImgHash } = req.body;

    if (!title || !description || !ImgHash) {
      return res.status(400).send("Missing parameters");
    }

    const queryText =
      "INSERT INTO announcements (title, description, file_path, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id";
    const values = [title, description, ImgHash];
    const result = await db.query(queryText, values);

    res.status(201).json({
      message: "Announcement created successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const id = req.params.id;
  try {
    const query = "DELETE FROM announcements WHERE id = $1";
    const result = await db.query(query, [id]);
    console.log(result.rowCount);
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ error: "Error deleting announcement" });
  }
};
