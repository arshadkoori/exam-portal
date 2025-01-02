import { Router } from "express";
import * as user from "../requesthandlers/user.handler.js";
import {
  authenticateToken,
  isAuthenticated,
  authorizeRoles,
} from "../middleware/auth.js";

import { createExam } from "../requesthandlers/exam.handler.js";

import { getExams, getExamTitles, getExamQuestions } from "../requesthandlers/exam.handler.js";

const router = Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/request-password-reset").post(user.requestPasswordReset);
router.route("/change-password").post(user.changePassword);

router.post("/api/exam", createExam);
router.get("/api/exam/titles", getExamTitles);
router.get("/api/exam/:id", getExamQuestions);
router.get("/api/exam", getExams);

// Example protected route
router
  .route("/protected")
  .get(authenticateToken, isAuthenticated, (req, res) => {
    res.status(200).json({ msg: "This is a protected route", user: req.user });
  });

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

export default router;
