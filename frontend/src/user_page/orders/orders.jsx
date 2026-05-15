import React from "react";

const Orders = () => {
  const orders = [
    {
      instrument: "RELIANCE",
      exchange: "NSE",
      type: "BUY",
      qty: "50 / 50",
      price: "2,985.00",
      status: "Pending",
      time: "10:45:12",
      typeClass: "buy",
      statusClass: "pending",
    },
    {
      instrument: "TCS",
      exchange: "NSE",
      type: "SELL",
      qty: "10 / 10",
      price: "4,125.40",
      status: "Executed",
      time: "10:30:05",
      typeClass: "sell",
      statusClass: "executed",
    },
    {
      instrument: "HDFCBANK",
      exchange: "NSE",
      type: "BUY",
      qty: "0 / 25",
      price: "1,452.00",
      status: "Cancelled",
      time: "09:55:42",
      typeClass: "buy",
      statusClass: "cancelled",
    },
    {
      instrument: "INFY",
      exchange: "NSE",
      type: "BUY",
      qty: "100 / 100",
      price: "1,640.25",
      status: "Executed",
      time: "09:22:15",
      typeClass: "buy",
      statusClass: "executed",
    },
    {
      instrument: "ZOMATO",
      exchange: "NSE",
      type: "SELL",
      qty: "1000 / 1000",
      price: "164.50",
      status: "Executed",
      time: "09:15:30",
      typeClass: "sell",
      statusClass: "executed",
    },
  ];

  return (
    <div className="orders-container">
      <div className="page-header">
        <div className="header-text">
          <h1>Orders</h1>
          <p>Manage and track your market executions and pending requests.</p>
        </div>
        <div className="header-tabs">
          <button className="active">All Orders</button>
          <button>Open (2)</button>
          <button>Executed</button>
        </div>
      </div>

      <div className="orders-top-grid">
        <div className="search-card">
          <div className="card-header">
            <span>SEARCH ORDERS</span>
            <span className="material-symbols-outlined">search</span>
          </div>
          <input type="text" placeholder="Search instrument..." className="search-input" />
          <div className="popular-tags">
            <span className="tag active">RELIANCE</span>
            <span className="tag">TCS</span>
            <span className="tag">HDFCBANK</span>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Today's Executed</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Pending Orders</span>
              <span className="stat-value tertiary">02</span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Total Volume</span>
              <span className="stat-value">₹45.2L</span>
            </div>
            <div className="stat-item border-left">
              <span className="stat-label">Order Health</span>
              <span className="stat-value secondary">98.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="orders-table-wrapper">
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
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  <div className="stock-info">
                    <span className="name">{order.instrument}</span>
                    <span className="exchange">{order.exchange}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${order.typeClass}`}>{order.type}</span>
                </td>
                <td className="font-mono">{order.qty}</td>
                <td className="font-mono">{order.price}</td>
                <td>
                  <div className={`status-pill ${order.statusClass}`}>
                    <span className="dot"></span>
                    {order.status}
                  </div>
                </td>
                <td className="text-right font-mono time">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Showing 5 of 12 orders</span>
          <div className="pagination">
            <button><span className="material-symbols-outlined">chevron_left</span></button>
            <button><span className="material-symbols-outlined">chevron_right</span></button>
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
            <a href="#">View details <span className="material-symbols-outlined">arrow_forward</span></a>
          </div>
        </div>
        <div className="help-card">
          <div className="icon-wrapper secondary">
            <span className="material-symbols-outlined">help_outline</span>
          </div>
          <div className="help-content">
            <h3>Need Support?</h3>
            <p>If you encounter issues with order placements, our desk support team is available.</p>
            <a href="#">Contact Support <span className="material-symbols-outlined">chat_bubble</span></a>
          </div>
        </div>
      </div>
      
      <button className="fab-new-order">
        <span className="material-symbols-outlined">add_shopping_cart</span>
        New Order
      </button>
    </div>
  );
};

export default Orders;
