// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast";
// import { Navigate, Outlet } from "react-router-dom";

// // import { Navigate, Outlet } from "react-router-dom";
// // import jwtDecode from "jwt-decode";  // Ensure jwt-decode is imported

// export default function Auth() {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("Role");
//   console.log(token);
//   console.log(role);

//   if (token) {
//     try {
//       const decoded = jwtDecode(token); // Decode the token
//     //   const userId = decoded.userId;
//     //   console.log(userId);
//     console.log(decoded.role);

//       console.log("Decoded Token :", decoded); // Debugging

//       if (  role === "instructor") {
//         console.log("Access granted: Instructor"); // Debugging statement
//         toast.success("Access granted: Instructor")
//         return <Outlet />; // Show protected content for Instructor
//       } else if (decoded.role === "student") {
//         console.log("Access granted: Student"); // Debugging statement
//         toast.success("Access granted: Student")
//         return <Outlet />; // Show protected content for Student
//       } else {
//         console.log("Invalid role. Redirecting to login.");
//         return <Navigate to="/login" replace={true} />; // Invalid role
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return <Navigate to="/login" replace={true} />; // Token decoding error
//     }
//   }

//   // If no token is found, redirect to login
//   return <Navigate to="/login" replace={true} />;
// }

// import jwt from "jsonwebtoken";

// export function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Bearer header
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authentication token is required" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     req.user = user; // Attach user info to the request
//     next();
//   });
// }

// export function authorizeRole(role) {
//   return (req, res, next) => {
//     if (!req.user || req.user.role !== role) {
//       return res
//         .status(403)
//         .json({ message: "Access forbidden: insufficient role privileges" });
//     }
//     next();
//   };
// }

// import { Navigate, Outlet } from "react-router-dom";

// export default function Auth({children}) {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("Role");
//     console.log(token);
//     console.log(role);

//     if(token) {
//         // return <>{children}</>
//         return <Outlet/>
//     }
//     return <Navigate to={"/login"} replace={true} />
// }
