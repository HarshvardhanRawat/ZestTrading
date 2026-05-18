import React, {useState, useEffect} from "react";

import axios from "axios";

// import {holdings} from "../../data/data.js"

const Holdings = () => {

  const [AllHoldings, setAllHoldings] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3000/allHoldings')
      .then(res => {
        setAllHoldings(res.data);
      })
      .catch(err => {
        console.error('Error fetching holdings:', err);
      });
  }, []);

  return (
    <div className="holdings-container">
      <div className="holdings-stats">
        <div className="stat-card">
          <span className="stat-label">Total Investment</span>
          <span className="stat-value">$124,500.00</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Current Value</span>
          <span className="stat-value primary">$138,242.15</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total P&L</span>
          <div className="value-group">
            <span className="stat-value secondary">+$13,742.15</span>
            <span className="stat-sub-value secondary">(+11.04%)</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Day's P&L</span>
          <div className="value-group">
            <span className="stat-value secondary">+$842.10</span>
            <span className="stat-sub-value secondary">(+0.61%)</span>
          </div>
        </div>
      </div>

      <div className="holdings-table-wrapper">
        <div className="table-header">
          <h2>Holdings ({AllHoldings.length})</h2>
          <button className="btn-analyze">
            <span className="material-symbols-outlined">analytics</span>
            Analyze Portfolio
          </button>
        </div>
        <div className="overflow-x">
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Avg. Cost</th>
                <th className="text-right">LTP</th>
                <th className="text-right">Cur. Val</th>
                <th className="text-right">P&L</th>
                <th className="text-right">% Chg</th>
              </tr>
            </thead>
            <tbody>
              {AllHoldings.map((stock, index) => (
                <tr key={index} className="hover-row">
                  <td>
                    <div className="stock-info">
                      <span className="name">{stock.name}</span>
                      <span className="desc">{stock.desc}</span>
                    </div>
                  </td>
                  <td className="text-right font-mono">{stock.qty}</td>
                  <td className="text-right font-mono">{stock.avg}</td>
                  <td className="text-right font-mono">{stock.ltp}</td>
                  <td className="text-right font-mono font-bold">{stock.curVal}</td>
                  <td className={`text-right font-mono font-bold ${stock.type}`}>{stock.pl}</td>
                  <td className={`text-right font-mono font-bold ${stock.type}`}>{stock.chg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="holdings-insights">
        <div className="insight-card dashed">
          <div className="insight-header">
            <span className="material-symbols-outlined primary">lightbulb</span>
            <h3>Portfolio Insight</h3>
          </div>
          <p>Your portfolio is currently 65% weighted in Tech. Diversifying into Healthcare or Energy could reduce your volatility exposure.</p>
        </div>
        <div className="insight-card dashed">
          <div className="insight-header">
            <span className="material-symbols-outlined primary">event</span>
            <h3>Upcoming Dividends</h3>
          </div>
          <ul className="dividend-list">
            <li>
              <span>AAPL - Ex-date May 10</span>
              <span className="font-bold">$0.24/share</span>
            </li>
            <li>
              <span>MSFT - Ex-date May 15</span>
              <span className="font-bold">$0.75/share</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
