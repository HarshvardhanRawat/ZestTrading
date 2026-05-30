import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:3000/allOrders")
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  // Filter calculations
  const openOrdersCount = orders.filter(
    (o) =>
      String(o.status).toLowerCase().includes("pending") ||
      String(o.status).toLowerCase().includes("open")
  ).length;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = String(order.instrument || "")
      .toUpperCase()
      .includes(searchTerm.toUpperCase());

    if (activeTab === "open") {
      const isPending =
        String(order.status).toLowerCase().includes("pending") ||
        String(order.status).toLowerCase().includes("open");
      return matchesSearch && isPending;
    } else if (activeTab === "executed") {
      const isExecuted =
        String(order.status).toLowerCase().includes("executed") ||
        String(order.status).toLowerCase().includes("completed") ||
        String(order.status).toLowerCase().includes("success");
      return matchesSearch && isExecuted;
    }
    return matchesSearch;
  });

  const totalVolume = orders
    .filter(
      (o) =>
        String(o.status).toLowerCase().includes("executed") ||
        String(o.status).toLowerCase().includes("success") ||
        String(o.status).toLowerCase().includes("completed")
    )
    .reduce((sum, o) => {
      const q = parseInt(String(o.qty).split("/")[0].trim(), 10) || 0;
      const p = parseFloat(String(o.price).replace(/,/g, "")) || 0;
      return sum + q * p;
    }, 0);

  const formatVolume = (val) => {
    if (val === 0) return "₹ 0";
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} L`;
    return val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="orders-container">
      <div className="page-header">
        <div className="header-text">
          <h1>Orders</h1>
          <p>Manage and track your market executions and pending requests.</p>
        </div>
        <div className="header-tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Orders
          </button>
          <button className={activeTab === "open" ? "active" : ""} onClick={() => setActiveTab("open")}>
            Open ({openOrdersCount})
          </button>
          <button className={activeTab === "executed" ? "active" : ""} onClick={() => setActiveTab("executed")}>
            Executed
          </button>
        </div>
      </div>

      <div className="orders-top-grid">
        <div className="search-card">
          <div className="card-header">
            <span>SEARCH ORDERS</span>
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            placeholder="Search instrument..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="popular-tags">
            {["RELIANCE", "TCS", "HDFCBANK"].map((tag) => (
              <span
                key={tag}
                className={`tag ${searchTerm.toUpperCase() === tag ? "active" : ""}`}
                onClick={() => setSearchTerm(searchTerm.toUpperCase() === tag ? "" : tag)}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Today's Executed</span>
              <span className="stat-value">
                {orders.filter(o => String(o.status).toLowerCase().includes("executed") || String(o.status).toLowerCase().includes("success")).length}
              </span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Pending Orders</span>
              <span className="stat-value tertiary">{openOrdersCount}</span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Total Volume</span>
              <span className="stat-value">{formatVolume(totalVolume)}</span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Order Health</span>
              <span className="stat-value secondary">98.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="orders-table-wrapper">
        <div className="overflow-x">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>
                      <div className="stock-info">
                        <span className="name">{order.instrument}</span>
                        <span className="exchange">{order.exchange}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${order.typeClass || (order.type === "BUY" ? "buy" : "sell")}`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="font-mono">{order.qty}</td>
                    <td className="font-mono">{order.price}</td>
                    <td>
                      <div className={`status-pill ${order.statusClass || order.status.toLowerCase()}`}>
                        <span className="dot"></span>
                        {order.status}
                      </div>
                    </td>
                    <td className="text-right font-mono time">{order.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--color-on-surface-variant)" }}>
                    No orders match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing {filteredOrders.length} orders</span>
          <div className="pagination">
            <button>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="orders-help-grid">
        <div className="help-card">
          <div className="icon-wrapper primary">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div className="help-content">
            <h3>Order Execution Policy</h3>
            <p>All orders are executed at the best available market price during market hours.</p>
            <a href="#">
              View details <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
        <div className="help-card">
          <div className="icon-wrapper secondary">
            <span className="material-symbols-outlined">help_outline</span>
          </div>
          <div className="help-content">
            <h3>Need Support?</h3>
            <p>If you encounter issues with order placements, our desk support team is available.</p>
            <a href="#">
              Contact Support <span className="material-symbols-outlined">chat_bubble</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
