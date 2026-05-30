import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from '../assets/Zest_logoT.png';

import axios from "axios";
import BuyActionWindow from "../components/buyActionWindow";
import SellActionWindow from "../components/sellActionWindow";

// import { watchlist } from "../data/data.js";

const Sidebar = () => {
  const location = useLocation();

  const [allWatchlist, setAllWatchlist] = useState([]);
  const [selectedStockForBuy, setSelectedStockForBuy] = useState(null);
  const [selectedStockForSell, setSelectedStockForSell] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/allWatchlist`)
      .then(res => {
        setAllWatchlist(res.data);
      })
      .catch(err => {
        console.error('Error fetching watchlist:', err);
      });
  }, []);



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
          {allWatchlist.map((item) => {
            if (!item) return null;
            const changeClass = item.isDown ? 'negative' : 'positive';
            
            let cleanedPercent = '0.00%';
            if (item.percent !== undefined && item.percent !== null) {
              if (typeof item.percent === 'number') {
                cleanedPercent = `${Math.abs(item.percent).toFixed(2)}%`;
              } else if (typeof item.percent === 'string') {
                const rawPercent = item.percent.replace('+', '').replace('-', '');
                cleanedPercent = rawPercent.endsWith('%') ? rawPercent : `${rawPercent}%`;
              }
            }

            const displayPrice = typeof item.price === 'number'
              ? item.price.toFixed(2)
              : (item.price && !isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2) : '0.00');

            return (
              <div className={`watchlist-item ${changeClass}`} key={item._id || item.id}>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-exchange">{item.exchange}</span>
                </div>
                <div className="item-price">
                  <span className="price">{displayPrice}</span>
                  <span className={`change ${changeClass}`}>
                    {item.isDown ? '-' : '+'}{cleanedPercent}
                  </span>
                </div>
                <div className="watchlist-item-actions">
                  <button 
                    className="action-btn buy" 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedStockForBuy(item); }}
                  >
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Buy
                  </button>
                  <button 
                    className="action-btn sell" 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedStockForSell(item); }}
                  >
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
      {selectedStockForBuy && (
        <BuyActionWindow 
          stock={selectedStockForBuy} 
          onClose={() => setSelectedStockForBuy(null)} 
        />
      )}
      {selectedStockForSell && (
        <SellActionWindow 
          stock={selectedStockForSell} 
          onClose={() => setSelectedStockForSell(null)} 
        />
      )}
    </aside>
  );
};

export default Sidebar;

