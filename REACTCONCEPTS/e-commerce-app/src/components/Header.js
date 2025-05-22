import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ShopSphere</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/sign in">Sign in</Link>
        {user && (
          <div className="user-profile">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
