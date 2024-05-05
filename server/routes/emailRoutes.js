import express from "express";
import { sendEmailToSelectedUsers } from "../controllers/emailController.js";

const router = express.Router();

router.post("/sendmailtoselectedusers", sendEmailToSelectedUsers);

export default router;
