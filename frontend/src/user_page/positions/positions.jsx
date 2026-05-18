import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/allPositions")
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
      });
  }, []);

  const formatCurrency = (value) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  const parsePL = (pl) => {
    const value = parseFloat(pl);
    return Number.isFinite(value) ? value : 0;
  };

  const totalPositivePL = allPositions.reduce(
    (acc, pos) =>
      acc + (String(pos.type).toLowerCase() === "positive" ? parsePL(pos.pl) : 0),
    0
  );

  const totalNegativePL = allPositions.reduce(
    (acc, pos) =>
      acc + (String(pos.type).toLowerCase() === "negative" ? parsePL(pos.pl) : 0),
    0
  );

  const positivePL = formatCurrency(totalPositivePL);
  const negativePL = formatCurrency(totalNegativePL);
  const totalPL = formatCurrency(totalPositivePL + totalNegativePL);
  const positionCount = allPositions.length;

  return (
    <div className="positions-container">
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-header">
            <span className="label">Total P&L</span>
            <span className="material-symbols-outlined secondary">trending_up</span>
          </div>
          <div className="value-row">
            <h2 className="value secondary">{totalPL}</h2>
            <span className="badge-pill secondary">{positionCount} Positions</span>
          </div>
          <div className="progress-bar">
            <div className="progress secondary" style={{ width: "65%" }}></div>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-header">
            <span className="label">Positive P&L</span>
            <span className="material-symbols-outlined primary">insights</span>
          </div>
          <h2 className="value primary">{positivePL}</h2>
          <p className="sub-label">Winning positions total</p>
        </div>
        <div className="summary-card">
          <div className="card-header">
            <span className="label">Negative P&L</span>
            <span className="material-symbols-outlined secondary">payments</span>
          </div>
          <h2 className="value secondary">{negativePL}</h2>
          <p className="sub-label">Losing positions total</p>
        </div>
        <div className="summary-card">
          <div className="card-header">
            <span className="label">Margin Used</span>
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <h2 className="value">₹1,45,000</h2>
          <p className="sub-label">Available: ₹85,200</p>
        </div>
      </div>

      <div className="positions-table-wrapper">
        <div className="table-header">
          <div className="header-left">
            <h3>Active Positions</h3>
            <span className="count-badge">{positionCount} Positions</span>
          </div>
          <div className="header-actions">
            <button className="btn-outline">
              <span className="material-symbols-outlined">filter_list</span>
              Filter
            </button>
            <button className="btn-outline">
              <span className="material-symbols-outlined">download</span>
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x">
          <table className="positions-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th className="text-center">Product</th>
                <th className="text-right">Qty (Net)</th>
                <th className="text-right">Avg. Price</th>
                <th className="text-right">LTP</th>
                <th className="text-right">P&L</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((pos, index) => (
                <tr key={index} className="hover-row">
                  <td>
                    <div className="stock-info">
                      <span className="name">{pos.name}</span>
                      <span className="desc">{pos.desc}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`product-badge ${pos.product.toLowerCase()}`}>{pos.product}</span>
                  </td>
                  <td className="text-right font-mono">{pos.qty}</td>
                  <td className="text-right font-mono">{pos.avg}</td>
                  <td className={`text-right font-mono ${pos.type}`}>{pos.ltp}</td>
                  <td className={`text-right font-mono font-bold ${pos.type}`}>{pos.pl}</td>
                  <td className="text-right">
                    <div className="action-btns">
                      <button className="btn-exit">Exit</button>
                      <button className="btn-convert">Convert</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer-summary">
          <div className="footer-stats">
            <div className="footer-stat">
              <span className="label">Total Positive</span>
              <span className="value secondary">{positivePL}</span>
            </div>
            <div className="footer-stat">
              <span className="label">Total Negative</span>
              <span className="value secondary">{negativePL}</span>
            </div>
          </div>
          <button className="btn-exit-all">
            <span className="material-symbols-outlined">logout</span>
            Exit All Positions
          </button>
        </div>
      </div>

      <div className="positions-bottom-grid">
        <div className="performance-card">
          <div className="performance-header">
            <div className="header-left">
              <h4>Market Performance</h4>
              <span className="sub">NIFTY 50</span>
            </div>
            <div className="filters">
              <button className="active">1D</button>
              <button>1W</button>
              <button>1M</button>
            </div>
          </div>
          <div className="bar-chart">
            <div className="bar secondary-20" style={{ height: "40%" }}></div>
            <div className="bar secondary-30" style={{ height: "60%" }}></div>
            <div className="bar secondary-10" style={{ height: "30%" }}></div>
            <div className="bar tertiary-20" style={{ height: "50%" }}></div>
            <div className="bar secondary-40" style={{ height: "80%" }}></div>
            <div className="bar secondary-60" style={{ height: "90%" }}></div>
            <div className="bar secondary-50" style={{ height: "75%" }}></div>
            <div className="bar tertiary-30" style={{ height: "45%" }}></div>
            <div className="bar secondary-40" style={{ height: "85%" }}></div>
            <div className="bar secondary-30" style={{ height: "65%" }}></div>
          </div>
        </div>
        <div className="expiry-card">
          <h4>Upcoming Expiries</h4>
          <div className="expiry-list">
            <div className="expiry-item active">
              <span>NIFTY Weekly</span>
              <span className="tag-error">TOMORROW</span>
            </div>
            <div className="expiry-item">
              <span>BANKNIFTY Weekly</span>
              <span className="tag-outline">3 DAYS</span>
            </div>
            <div className="expiry-item">
              <span>FINNIFTY Weekly</span>
              <span className="tag-outline">5 DAYS</span>
            </div>
          </div>
          <button className="btn-link">
            View Option Chain
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Positions;
