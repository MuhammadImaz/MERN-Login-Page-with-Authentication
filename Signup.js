import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import your CSS file
import { Link } from "react-router-dom";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/register").then((res) => {
      // console.log(res.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", { email, username, password })
      .then(() => {
        alert("Registration Successful");
        setEmail("");
        setUsername("");
        setPassword("");
        fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login-header">
          <span>Sign Up</span>
        </div>
        <div className="input_box">
          <label className="label1"> Email</label>
          <input
            className="input-field bg-[#1a1a1a]"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />
          <label className="label2">Username</label>
          <input
            className="input-field bg-[#1a1a1a]"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <br />
          <label className="label3">Password</label>
          <input
            className="input-field bg-[#1a1a1a]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />
          <button className="input-submit" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div className="register">
          <span>
            Already have an account? <Link to="/Login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
