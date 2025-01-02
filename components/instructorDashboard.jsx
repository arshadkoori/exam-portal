// export default function InstructorDashboard() {
//     return(
//         <h1>Instructor dashboard</h1>
//     )
// }

import React from "react";
import "./css/instructorDashboard.css";
import { Link } from "react-router-dom";

import exam from "./images/exam.png";

export default function InstructorDashboard() {
  return (
    <div className="instructorDashboard">
      <nav className="instructorDashboardNavbar">
        <div className="instructorDashboardNavbar-brand">
          {/* <span className="instructorDashboardSpan">Exam Portal</span> */}
          <span className="instructorDashboardSpan">instructor dashboard</span>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/add-exam">
              <button className="instructorDashboardButton">Create exam</button>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="instructorDashboardBody">
        <h1 className="instructorDashboardHead1">Create exams</h1>
      </div>
      {/* <p>Here is an overview of your activities.</p> */}
    </div>
  );
}

// export default Dashboard;
