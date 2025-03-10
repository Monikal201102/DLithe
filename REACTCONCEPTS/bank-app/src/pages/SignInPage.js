import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.js"; // Ensure correct import

function SignInPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      setError("All fields are required!");
      return;
    }

    // Get registered users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if user exists and credentials match
    const userExists = users.find(
      (user) => user.username === form.username && user.password === form.password
    );

    if (!userExists) {
      setError("Invalid username or password!");
      return;
    }

    console.log("Sign-in successful:", form);

    // Simulating sign-in success
    setTimeout(() => {
      navigate("/transaction"); // Redirect to Transaction Page
    }, 1000);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <p className="continue-text">Enter your credentials to access your account.</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Sign In</button>
      </form>

      <p className="register-text">
        Don't have an account? <span onClick={() => navigate("/register")}>Register here</span>
      </p>
    </div>
  );
}

export default SignInPage;
