import express from "express";
import {
  getStudentsList,
  getAssignmentList,
  getStudentProfile,
  getStudentSubmissionsList,
  getAttendanceSheet,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/studentslist", getStudentsList);
router.get("/assignmentlist", getAssignmentList);
router.get("/studentsprofile", getStudentProfile);
router.get("/studentsubmissionslist", getStudentSubmissionsList);
router.get("/attendancesheet", getAttendanceSheet);

export default router;
