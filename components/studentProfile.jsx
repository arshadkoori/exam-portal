import { useEffect, useState } from "react";
import { profile } from "./utils/helpers";
import toast from "react-hot-toast";
import "./css/studentProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [user, setUser] = useState(null); // User state to store the fetched user data
  const [loading, setLoading] = useState(true); // Loading state to handle loading logic
  const [exam, setExam] = useState(null);

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
    window.location.reload(); // Reload to reset state
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
    <div className="studentProfileMain">
      <div className="studentProfileMainNav">
        <span className="studentProfileSpan">My Profile</span>
        <div className="studentProfileMainNavLeft">
          <button onClick={logout} className="studentProfileMainButton">
            Logout
          </button>
          <img
            src={user.image || "default-avatar.png"}
            alt="Profile"
            className="studentProfileImg"
          />
        </div>
      </div>

      <div className="studentProfileData">
        {/* <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p> */}

        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="studentProfileTable">
        {/* <table>
          <td>
            <th>hai</th>
            <th>hello</th>
          </td>
        </table> */}
      </div>
    </div>
  );
}
