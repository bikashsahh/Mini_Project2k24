import db from "../database.js";

export const createMessage = async (req, res) => {
  const { message } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO  messages (message_text) VALUES ($1) RETURNING *",
      [message]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const result = await db.query("SELECT id, message_text FROM messages");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const deleteQuery = "DELETE FROM messages WHERE id = $1";
    const result = await db.query(deleteQuery, [messageId]);
    if (result.rowCount === 1) {
      res.status(200).json({ message: "Message deleted successfully" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
