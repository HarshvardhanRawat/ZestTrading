import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from '../assets/Zest_logoT.png';
import { watchlist } from "../data/data.js";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: "dashboard", path: "/dashboard" },
    { label: "Orders", icon: "list_alt", path: "/dashboard/orders" },
    { label: "Holdings", icon: "account_balance", path: "/dashboard/holdings" },
    { label: "Positions", icon: "account_balance_wallet", path: "/dashboard/positions" },
    { label: "Funds", icon: "payments", path: "/dashboard/funds" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-img">
          <img src={logoImg} alt="Zest Logo" />
        </div>
        <div className="logo-text">
          <h1>Zest Trading</h1>
          <p className="market-status">
            <span className="status-dot"></span> Market Open
          </p>
        </div>
      </div>

      <div className="sidebar-action">
        <button className="btn-add-funds">
          <span className="material-symbols-outlined">add</span>
          Add Funds
        </button>
      </div>

      <div className="sidebar-nav">
        <div className="nav-header">
          <span>WATCHLIST</span>
          <span className="material-symbols-outlined search-icon">search</span>
        </div>
        
        <div className="watchlist-items">
          {watchlist.map((item) => {
            const changeClass = item.isDown ? 'negative' : 'positive';
            const cleanedPercent = item.percent.replace('+', '');
            return (
              <div className={`watchlist-item ${changeClass}`} key={item.id}>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-exchange">{item.exchange}</span>
                </div>
                <div className="item-price">
                  <span className="price">{item.price.toFixed(2)}</span>
                  <span className={`change ${changeClass}`}>
                    {item.isDown ? '' : '+'}{cleanedPercent}
                  </span>
                </div>
                <div className="watchlist-item-actions">
                  <button className="action-btn buy" type="button">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Buy
                  </button>
                  <button className="action-btn sell" type="button">
                    <span className="material-symbols-outlined">sell</span>
                    Sell
                  </button>
                  <button className="action-btn" type="button">
                    <span className="material-symbols-outlined">stacked_line_chart</span>
                    Depth
                  </button>
                  <button className="action-btn" type="button">
                    <span className="material-symbols-outlined">insights</span>
                    Chart
                  </button>
                  <button className="action-btn delete" type="button">
                    <span className="material-symbols-outlined">delete</span>
                    Delete
                  </button>
                  <button className="action-btn" type="button">
                    <span className="material-symbols-outlined">more_horiz</span>
                    More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="bottom-nav">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          <span className="material-symbols-outlined">show_chart</span>
          Markets
        </Link>
        <Link to="/dashboard/holdings" className={location.pathname === "/dashboard/holdings" ? "active" : ""}>
          <span className="material-symbols-outlined">account_balance_wallet</span>
          Portfolio
        </Link>
        <Link to="/dashboard/history" className={location.pathname === "/dashboard/history" ? "active" : ""}>
          <span className="material-symbols-outlined">history</span>
          History
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

