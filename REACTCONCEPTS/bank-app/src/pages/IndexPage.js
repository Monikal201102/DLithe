import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IndexPage.css"; // Ensure CSS is linked

function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simple fade-in animation effect on load
    const welcomeText = document.querySelector(".welcome-text");
    if (welcomeText) {
      welcomeText.classList.add("fade-in");
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to the Bank App</h1>
      <p className="continue-text">Please register or sign in to continue.</p>

      <div className="button-container">
        <button className="btn" onClick={() => navigate("/register")}>Register</button>
        <button className="btn" onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    </div>
  );
}

export default IndexPage;
