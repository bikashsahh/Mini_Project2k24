import express from "express";
import {
  login,
  verifyStudent,
  verifyAdmin,
  forgotPassword,
  updatePassword,
  checkUserStatus,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/verifystudent", verifyStudent);
router.get("/verifyadmin", verifyAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/update-password", updatePassword);
router.post("/check-status", checkUserStatus);
export default router;
