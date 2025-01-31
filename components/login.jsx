import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { profile } from "./utils/helpers";
import exam2 from "./images/exam2.png";

import "./css/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("token", response.data.token);
      console.log("Token stored:", response.data.token);

      const userData = await profile();
      console.log("User Data:", userData);

      const role = userData.role;
      console.log("Role:", role);
      localStorage.setItem("Role", role);
      const instructor_id = userData._id;
      const instructor_name = userData.username;

      const instructor = {
        id: userData._id,
        name: userData.username,
      };
      localStorage.setItem("instructor", JSON.stringify(instructor));

      if (role === "student") {
        navigate("/student-dashboard");
        toast.success("Login successfull");
        localStorage.setItem("Student_ID", instructor_id);
        localStorage.setItem("Student_Name", instructor_name);
      } else if (role === "instructor") {
        navigate("/instructor-dashboard");
        toast.success("Login success");
        localStorage.setItem("Instructor_ID", instructor_id);
        localStorage.setItem("Instructor_Name", instructor_name);
      } else {
        toast.error("Invalid user role");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="loginMain">
      <div className="loginContainer">
        <div className="loginDiv">
          <form onSubmit={handleSubmit} className="loginForm">
            <h2 className="logineHead2">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="loginUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="loginSubmit">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="loginImgContainer">
        <img src={exam2} alt="Login Illustration" />
      </div>
    </div>
  );
}
