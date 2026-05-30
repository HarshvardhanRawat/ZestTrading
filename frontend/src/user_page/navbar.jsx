import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../hooks/useTheme";

const Navbar = ({ username }) => {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Holdings", path: "/dashboard/holdings" },
    { label: "Positions", path: "/dashboard/positions" },
    { label: "Funds", path: "/dashboard/funds" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem("username");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  return (
    <header className="user-navbar">
      <div className="nav-left">
        <div className="nav-search">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search instruments..." />
        </div>
        <nav className="nav-tabs">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="nav-right">
        <button className="nav-icon-btn" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <button className="nav-icon-btn" onClick={handleLogout} title="Logout" style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined">logout</span>
        </button>
        <div className="nav-profile">
          <span className="material-symbols-outlined profile-icon">account_circle</span>
          <span className="profile-name">{username || "User"}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
