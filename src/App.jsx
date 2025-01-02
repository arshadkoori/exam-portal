import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Register from "../components/register";
import Login from "../components/login";
import StudentDashboard from "../components/StudentDashboard";
import InstructorDashboard from "../components/instructorDashboard";
import Dashboard from "../components/dashboard";
import Profile from "../components/profile";
import AddExam from "../components/addExam";
import ShowExams from "../components/showExams";
import ExamTitles from "../components/examTitles";
import ExamQuestions from "../components/examQuestions";

// import ExamList from "../components/examList";
// import Auth from "../backend/middleware/auth";
// import AccountDetails from "../components/accountDetails";

import "./App.css";

if (import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = location.origin;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Add-exam" element={<AddExam />} />
        <Route path="/show-exams" element={<ShowExams />} />
        <Route path="/exams" element={<ExamTitles />} />
        <Route path="/exam/:id" element={<ExamQuestions />} />
        {/* <Route path="/exam-list" element={<ExamList/>} /> */}
        {/* <Route path="/account-details" elemen={<AccountDetails/>} /> */}

        {/* <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="/account-details" element={<AccountDetails />} />
        </Route> */}

        {/* <Route element={<Auth />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
    // <Router>

    // </Router>
  );
}

export default App;
