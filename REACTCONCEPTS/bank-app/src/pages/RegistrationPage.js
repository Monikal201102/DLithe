import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css"; // Ensure this file exists

function RegistrationPage() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set fade-in effect on page load
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.username || !form.password || !form.email) {
      setError("All fields are required!");
      return;
    }

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username or email already exists
    const userExists = users.find(
      (user) => user.username === form.username || user.email === form.email
    );

    if (userExists) {
      setError("Username or Email already exists. Try signing in!");
      return;
    }

    // Add the new user to local storage
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    setSuccess("Registration successful! Redirecting to Sign In...");

    // Redirect to Sign In Page after 2 seconds
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className={`registration-container ${fadeIn ? "fade-in" : ""}`}>
      <h2>Register for Your Bank Account</h2>
      <p>Fill in your details to create an account.</p>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      <p className="login-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/signin")} className="clickable">
          Sign in
        </span>
      </p>
    </div>
  );
}

export default RegistrationPage;
