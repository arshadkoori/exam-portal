import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Outlet } from "react-router-dom";

import "./css/dashboard.css";
import examImg from "./images/exam-image.png";
import logo3 from "./images/logo1-removebg-preview.png";
import logo4 from "./images/logo2-removebg-preview.png";

function Dashboard() {
  const dashboardHead1 = "Welcome to \n Online Exam Portal";

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userId = localStorage.getItem("userId"); // Assuming user ID is saved during registration
  //       const response = await axios.get(`/api/user/${userId}`);
  //       setUser(response.data); // Set user data in state
  //     } catch (error) {
  //       console.error(error.response.data.msg);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // if (!user) return <p>Loading...</p>;

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const data = await getUsers();
  //       setQuestions(data);
  //       toast.success("Questions fetched successfully!");
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div className="dashboard">
      <nav className="dashboardNavbar">
        <div className="navbar-brand">
          {/* <span className="dashboardSpan">Exam Portal</span> */}
          <img src={logo4} alt="" className="dashboardLogo" />
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/register">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <div className="dashBoardBody">
        <h1 className="dashboardHead1">{dashboardHead1}</h1>
        <img src={examImg} alt="Exam Image" className="examImg" />
      </div>

      {/* <Outlet /> */}

    </div>
  );
}

export default Dashboard;


// UserDetails.js
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import "./css/userDetails.css";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null); // Add an error state

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Assuming you're storing the JWT in localStorage

//         if (!token) {
//           throw new Error("No token found");
//         }

//         const response = await axios.get("/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setError("Failed to fetch user details"); // Set an error message
//       }
//     };

//     fetchUser();
//   }, []);

//   if (error) {
//     return <p>{error}</p>; // Display error message
//   }

//   if (!user) {
//     return <p>Loading...</p>; // Display loading message
//   }

//   return (
//     <div className="userDetailsContainer">
//       <h2>User Details</h2>
//       <p>Username: {user.username}</p>
//       <p>Email: {user.email}</p>
//       <p>Role: {user.role}</p>
//     </div>
//   );
// }

// export default Dashboard;
