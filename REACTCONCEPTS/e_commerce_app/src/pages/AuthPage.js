import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password) => /^[0-9]{6}$/.test(password); // Only 6-digit numeric passwords

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be exactly 6 digits.");
      return;
    }

    if (isSignUp) {
      if (users.some((user) => user.email === formData.email)) {
        setError("User already exists. Please sign in.");
        return;
      }
      const updatedUsers = [...users, formData];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setIsSignUp(false);
    } else {
      const existingUser = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (!existingUser) {
        setError("User not found or incorrect password.");
        return;
      }
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-logo">ShopSphere</h1>
      <div className="auth-card">
        <h2 className="auth-title">{isSignUp ? "Create Account" : "Welcome Back!"}</h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="auth-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password (6-digit)"
            className="auth-input"
            value={formData.password}
            onChange={(e) => {
              if (/^\d{0,6}$/.test(e.target.value)) {
                setFormData({ ...formData, password: e.target.value });
              }
            }}
            required
          />
          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="auth-toggle">
          {isSignUp ? "Already have an account? " : "New here? "}
          <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
