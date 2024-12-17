import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "../components/register";
import Login from "../components/login"
import './App.css';
import axios from 'axios';

if (import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = location.origin;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
