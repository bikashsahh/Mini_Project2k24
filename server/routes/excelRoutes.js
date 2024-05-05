import express from "express";
import multer from "multer";
import { ExcelFile } from "../controllers/excelController.js";

const router = express.Router();
const uploads = multer({ storage: multer.memoryStorage() });

router.post("/upload-excel", uploads.single("file"), ExcelFile);

export default router;
