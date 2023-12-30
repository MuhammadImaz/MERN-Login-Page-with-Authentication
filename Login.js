import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const token = response.data.token;
      alert("Login successful");
      setUsername("");
      setPassword("");
      fetchUsers();
      navigate("/account");
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login-header">
          <span>Login</span>
        </div>
        <div className="input_box">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
            type="text"
            id="user"
            className="input-field bg-[#1a1a1a]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <i className="bx bx-user icon"></i>
        </div>
        <div className="input_box">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
            type="password"
            id="pass"
            className="input-field bg-[#1a1a1a]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="input_box">
          <input
            type="submit"
            className="input-submit"
            value="Login"
            onClick={handleLogin}
          />
        </div>
        <div className="register">
          <span>
            Don't have an account? <Link to="/Signup" >Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
