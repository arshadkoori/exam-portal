import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify the token
// export function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msg: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded token info to request
//     next(); // Continue to the next middleware or route handler
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return res.status(403).json({ msg: "Invalid or expired token." });
//   }
// }


// const jwt = require("jsonwebtoken");

export function authenticateToken  (req, res, next)  {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user ID or data to the request
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// module.exports = authenticateToken;



// Middleware to check if user is authenticated (example for specific roles if needed)
export function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ msg: "Authentication required." });
  }
  next();
}

// Middleware for role-based authorization (optional)
export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: "Access forbidden: insufficient privileges." });
    }
    next();
  };
}


// import { Navigate, Outlet } from "react-router-dom";

// export default function Auth() {
//   const token = localStorage.getItem("token");

//   if (token) {
//     return (
//       <>
//         <Outlet />
//       </>
//     );
//   }

//   return <Navigate to="/dashboard" replace={true} />;
// }

// import { Navigate, Outlet } from 'react-router-dom';

// const Auth = () => {
//   const token = localStorage.getItem('token');

//   return token ? <Outlet /> : <Navigate to="/dashboard" replace />;
// };

// export default Auth;
