// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// import { Outlet } from "react-router-dom";

// import "./css/dashboard.css";
// import examImg from "./images/exam-image.png";
// import logo4 from "./images/logo2-removebg-preview.png";
// import Navbar from "./navbar";

// function Dashboard() {
//   const dashboardHead1 = "Welcome to \n Online Exam Portal";

//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <div className="dashboard">
//       {/* <Navbar /> */}
//       <nav className="dashboardNavbar">
//         <div className="navbar-brand">
//           {/* <span className="dashboardSpan">Exam Portal</span> */}
//           <img src={logo4} alt="" className="dashboardLogo" />
//         </div>
//         <ul className="navbar-links">
//           <li>
//             <Link to="/register">Signup</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//       </nav>

//       <div className="dashBoardBody">
//         <h1 className="dashboardHead1">{dashboardHead1}</h1>
//         <img src={examImg} alt="Exam Image" className="examImg" />
//       </div>

//       {/* <Outlet /> */}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/dashboard.css";
import examImg from "./images/exam-image.png";
import logo4 from "./images/logo2-removebg-preview.png";

function Dashboard() {
  const dashboardHead1 = "Welcome to \n Online Exam Portal";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="dashboardNavbar">
        <div className="navbar-brand">
          <img src={logo4} alt="Logo" className="dashboardLogo" />
        </div>
        {/* Menu Button */}
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>
          <li>
            <Link to="/register">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      {/* Body */}
      <div className="dashBoardBody">
        <h1 className="dashboardHead1">{dashboardHead1}</h1>
        <img src={examImg} alt="Exam Image" className="examImg" />
      </div>
    </div>
  );
}

export default Dashboard;
