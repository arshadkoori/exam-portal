//  register

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import toBase64 from "./utils/converters";
import avatar from "./images/Avatar.png";
import exam from "./images/exam.png";
import "./css/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const imageChanger = async (e) => {
    let file = e.target.files[0];
    let base64Image = await toBase64(file);
    setImage(base64Image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
        role,
        image,
      });
      toast.success(response.data.msg);
      navigate("/login"); // Redirect to the success page
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="registerMain">
      <div className="registerImgContainer">
        <img src={exam} alt="" />
      </div>
      <div className="registerContainer">
        <div className="registerDiv">
          <div className="" style={{ backgroundImage: "url('')" }}></div>
          <div className="">
            {/* <h2 className="registerDivHead2">Register</h2> */}
            <form onSubmit={handleSubmit} className="registerForm">
              <label htmlFor="image">
                <img src={image ?? avatar} alt="" />
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={imageChanger}
                className="registerImage"
              />
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="registerUsername"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="registerEmail"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="registerPassword"
                  required
                />
              </div>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="registerSelectBox"
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <button type="submit" className="registerSubmit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
