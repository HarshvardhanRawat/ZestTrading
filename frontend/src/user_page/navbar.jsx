import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ username }) => {
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
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
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
        <button className="nav-icon-btn">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="nav-icon-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="nav-icon-btn" onClick={handleLogout} title="Logout" style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined">logout</span>
        </button>
        <div className="nav-profile">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHb7SKpHBUxV5J1EqBdaJnOZa8BxYKYPGjl8Pyd1DpeIIu8STgOMNKboCfaZCsIStvjaE-e3jbowgyxSN_CgAGF_8WEILawrEoqEx9TqPIzMXHdh4Z0kJ9PXPHawc5x67ocFExSsMZ59F80MTAgbHYlx_Hnb2uqiKQ2XxBF82yrQ776SaxaCMcw6nyHFhW7HiKnDvra4rYM1fH7XUdoaOE9mxMNQwV_j3xZvdH-t8fmq90O830fWaABL20a5r14L8BTiFvhILJ5Cg"
            alt="Profile"
          />
          <span className="profile-name">{username || "User"}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
