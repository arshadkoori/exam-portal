
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export async function getUsers() {
  try {
    const res = await axios.get("/api/get-users");
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions");
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/register", {
      username,
      email,
      password,
      role,
      image,
    });
    localStorage.setItem("token", response.data.token); // Save token
    toast.success(response.data.msg);
    navigate("/account"); // Redirect to account page
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

// Profile
export async function profile() {
  try {
    let token = localStorage.getItem("token");
    let res = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data);
  }
}

// show marks
export async function showMarks() {
  try {
    let token = localStorage.getItem("token");
    let res = await axios.get("/api/showmarks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data);
  }
}
