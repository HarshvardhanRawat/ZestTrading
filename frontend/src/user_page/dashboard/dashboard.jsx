import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import Summary from "./summary";
import Orders from "../orders/orders";
import Holdings from "../holdings/holdings";
import Positions from "../positions/positions";
import Funds from "../funds/funds";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <Navbar />
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
