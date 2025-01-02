  // // AccountDetails.js
  // import { useState, useEffect } from "react";
  // import axios from "axios";

  // export default function AccountDetails() {
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("/api/account-details");
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   if (!user) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <div className="accountDetailsMain">
  //       <h2>Account Details</h2>
  //       <div>
  //         <img src={user.image || "./images/Avatar.png"} alt="Profile" />
  //       </div>
  //       <p><strong>Username:</strong> {user.username}</p>
  //       <p><strong>Email:</strong> {user.email}</p>
  //       <p><strong>Role:</strong> {user.role}</p>
  //     </div>
  //   );
  // }


  // import { useEffect, useState } from "react";
  // import axios from "axios";

  // export default function AccountDetails() {
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const fetchUserDetails = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const response = await axios.get("/api/user", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Error fetching user details:", error.response?.data?.msg);
  //       }
  //     };

  //     fetchUserDetails();
  //   }, []);

  //   if (!user) return <p>Loading...</p>;

  //   return (
  //     <div>
  //       <h1>Account Details</h1>
  //       <img src={user.image || "/default-avatar.png"} alt="Profile" />
  //       <p>Username: {user.username}</p>
  //       <p>Email: {user.email}</p>
  //       <p>Role: {user.role}</p>
  //     </div>
  //   );
  // };
