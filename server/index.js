import express from "express";
import cors from "cors";
import db from "./Database.js";
import  sendEmailToAllUsers  from './mailer.js';


const app = express();
const port = 3000;


// Parse JSON requests
// app.use(bodyParser.json());


// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
//

app.get('/students', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM info');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  
// =============================
// app.get('/sendmailtoallusers', sendEmailToAllUsers);
app.post('/sendmailtoallusers', sendEmailToAllUsers)

// ----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//-------------------------------------------------------//
