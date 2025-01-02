import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate();
  
    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User Id");
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
