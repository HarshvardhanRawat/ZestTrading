import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import Summary from "./summary";
import Orders from "../orders/orders";
import Holdings from "../holdings/holdings";
import Positions from "../positions/positions";
import Funds from "../funds/funds";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/verify",
          {},
          { withCredentials: true }
        );
        if (data.status) {
          setUsername(data.user);
          setLoading(false);
        } else {
          localStorage.removeItem("username");
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth verification failed:", err);
        localStorage.removeItem("username");
        navigate("/login");
      }
    };
    verifyUser();
  }, [navigate]);

  useEffect(() => {
    document.body.classList.add("dashboard-active");
    return () => {
      document.body.classList.remove("dashboard-active");
    };
  }, []);

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner-large"></div>
        <div className="loading-text">Verifying secure session...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <Navbar username={username} />
        <div className="content-scrollable">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
