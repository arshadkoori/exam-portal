import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Register from "../components/register";
import Login from "../components/login";
import StudentDashboard from "../components/StudentDashboard";
import InstructorDashboard from "../components/instructorDashboard";
import Dashboard from "../components/dashboard";
import StudentProfile from "../components/studentProfile";
import InstructorProfile from "../components/instructorProfile";
import AddExam from "../components/addExam";
import ShowExams from "../components/showExams";
import ExamTitles from "../components/examTitles";
import ExamQuestions from "../components/examQuestions";
import ProtectedRoute from "../components/protectedRoute";

import StudentMarksPage from "../components/studentMarksPage";

import "./App.css";

if (import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = location.origin;
}

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/exams" element={<ExamTitles />} />
          <Route path="/exam/:id" element={<ExamQuestions />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-mark" element={<StudentMarksPage />} />
          
          {/* <Route path="/show-marks" element={<ShowMarks />} /> */}
        </Route>

        {/* Instructor Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route
            path="/instructor-dashboard"
            element={<InstructorDashboard />}
          />
          <Route path="/Add-exam" element={<AddExam />} />
          <Route path="/show-exams" element={<ShowExams />} />
          <Route path="/instructor-profile" element={<InstructorProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
