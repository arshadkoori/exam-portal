// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard() {

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("User Id");
//     navigate("/dashboard", { replace: true });
//   };

//   return (
//     <>
//       <h1>Student Dashboard</h1>
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// }

import { useNavigate, Link } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User Id");
    navigate("/dashboard", { replace: true });
  };

  const goToAccountDetails = () => {
    navigate("/account-details");
  };

  return (
    <>
      <h1>Student Dashboard</h1>
      <button onClick={goToAccountDetails}>Account Details</button>
      <button onClick={logout}>Logout</button>

      <Link to="/exam-list">
        <button>Go to exam</button>
      </Link>
    </>
  );
}

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function StudentDashboard() {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get the token from localStorage
//         if (!token) {
//           navigate("/login"); // Redirect to login if no token
//           return;
//         }

//         const response = await axios.get("/api/user", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in Authorization header
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         console.error(error.response?.data?.msg || "Error fetching user data");
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Account Details</h1>
//       {userData ? (
//         <div>
//           <p><strong>Username:</strong> {userData.username}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Role:</strong> {userData.role}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default StudentDashboard;
