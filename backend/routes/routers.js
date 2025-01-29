import { Router } from "express";
import * as user from "../requesthandlers/user.handler.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";


import {
  createExam,
  saveMarks,
  getStudentExams,
  updateQuestion,
  deleteExam,
  getStudentMarks
} from "../requesthandlers/exam.handler.js";

// import { verifyToken } from "../middleware/auth.js";

import auth from "../middleware/auth.js";

import {
  getExams,
  getExamTitles,
  getExamQuestions,
} from "../requesthandlers/exam.handler.js";

import User from "../models/user.model.js";

const router = Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
// router.route("/request-password-reset").post(user.requestPasswordReset);
// router.route("/change-password").post(user.changePassword);
router.route("/profile").get(auth, user.profile);

router.post("/api/exam", createExam);
router.get("/api/exam/titles", getExamTitles);
router.get("/api/exam/:id", getExamQuestions);
router.get("/api/exam", getExams);

// get exams
router.get("/student/exams", getStudentExams);

// edit exam
router.put("/api/exam/:examId/questions/:questionId", updateQuestion);

// DELETE: Delete an exam by its ID
router.delete("/exam/:examId", deleteExam);

// Route to get student marks by studentId
router.get("/exams/:studentId", getStudentMarks);

router.post("/saveMarks", saveMarks);
router.get(
  "/student-dashboard",
  authenticateToken,
  authorizeRoles("student"),
  (req, res) => {
    res.json({ message: "Welcome to the student dashboard!" });
  }
);

router.get(
  "/instructor-dashboard",
  authenticateToken,
  authorizeRoles("instructor"),
  (req, res) => {
    res.json({ message: "Welcome to the instructor dashboard!" });
  }
);

// Example role-based protected route
router
  .route("/admin")
  .get(authenticateToken, authorizeRoles("admin"), (req, res) => {
    res
      .status(200)
      .json({ msg: "This is an admin-only route", user: req.user });
  });

router.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

import Exam from "../models/exam.model.js";
import authMiddleware from "../middleware/auth.js";

router.post("/", authMiddleware, async (req, res) => {
  console.log(req.body); // Log the request payload
  const { examTitle, questions, instructorId } = req.body;

  if (!examTitle || !questions || !instructorId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newExam = new Exam({
      title: examTitle,
      questions,
      instructor: instructorId,
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Middleware to authenticate token
const tokenAuthentication = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Extract user data from token
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

// Route to get logged-in user details
router.get("/me", tokenAuthentication, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "-password"); // Exclude password
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
