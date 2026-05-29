import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/Zest_logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center h-full">
        <Link className="logo" to="/">
          <img src={logoImg} alt="Logo" />
        </Link>
        <div className="nav-links">
          <Link className="nav-link" to="/product">Product</Link>
          <Link className="nav-link" to="/pricing">Pricing</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/support">Support</Link>
        </div>
        <div className="flex items-center" style={{ gap: "20px" }}>
          <Link to="/login" style={{ color: "var(--color-on-surface-variant)", textDecoration: "none", fontWeight: "600" }} className="hover-underline">Log In</Link>
          <Link to="/signup"><button className="btn btn-primary label-md">Signup</button></Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
