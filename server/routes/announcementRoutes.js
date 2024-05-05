import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.get("/", getAnnouncements);
router.post("/", createAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
