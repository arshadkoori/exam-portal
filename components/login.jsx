import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import exam2 from "./images/exam2.png";

import "./css/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [role, SetRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      //   setMessage(response.data.msg);
      localStorage.setItem("token", response.data.token); // Store the token
      localStorage.setItem("Role", response.data.role);
      console.log(response.data.token);

      toast.success(response.data.msg);
      navigate("/student-dashboard");
    } catch (error) {
      setMessage(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };


  return (
    <div className="loginMain">
      <div className="loginContainer">
        <div className="loginrDiv">
          <form onSubmit={handleSubmit} className="loginForm">
            <h2>Login</h2>
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
          {/* {message && <p>{message}</p>} */}
        </div>
      </div>
      <div className="loginImgContainer">
        <img src={exam2} alt="" />
      </div>
    </div>
  );
}

export default Login;
