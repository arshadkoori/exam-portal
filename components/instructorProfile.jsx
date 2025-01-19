import { useEffect, useState } from "react";
import { profile } from "./utils/helpers";
import toast from "react-hot-toast";
import "./css/instructorProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUserTie } from "react-icons/fa";

export default function InstructorProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User Id");
    localStorage.removeItem("Instructor_ID");
    localStorage.removeItem("Instructor_Name");
    localStorage.removeItem("Student_ID");
    localStorage.removeItem("Student_Name");
    localStorage.removeItem("Role");
    localStorage.removeItem("instructor");
    navigate("/", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    profile()
      .then((userData) => {
        setUser(userData); // Update the user state with the fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        toast.error(error.msg || "Failed to fetch user profile.");
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data available.</p>;

  return (
    <div className="instructorProfileMain">
      <div className="instructorProfileMainNav">
        <span className="instructorProfileSpan">My Profile</span>
        <div className="instructorProfileMainNavLeft">
          <button onClick={logout} className="instructorProfileMainButton">
            Logout
          </button>
          <img
            src={user.image || "default-avatar.png"}
            alt="Profile"
            className="instructorProfileImg"
          />
        </div>
      </div>

      {/* <div className="instructorProfileData"> */}
        <div className="profileItem">
          <FaUser className="icon" />
          <span className="profileLabel">Username:</span>
          <span className="profileData">{user.username}</span>
        </div>
        <div className="profileItem">
          <FaEnvelope className="icon" />
          <span className="profileLabel">Email:</span>
          <span className="profileData">{user.email}</span>
        </div>
        <div className="profileItem">
          <FaUserTie className="icon" />
          <span className="profileLabel">Role:</span>
          <span className="profileData">{user.role}</span>
        </div>
      </div>
    // </div>
  );
}
