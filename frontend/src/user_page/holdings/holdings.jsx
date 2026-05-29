import React, { useState, useEffect } from "react";
import axios from "axios";

const Holdings = () => {
  const [AllHoldings, setAllHoldings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allHoldings")
      .then((res) => {
        setAllHoldings(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });
  }, []);

  // Analysis calculations
  const totalInvestment = AllHoldings.reduce((sum, h) => sum + (h.qty * h.avg || 0), 0);
  const currentValue = AllHoldings.reduce((sum, h) => sum + (h.curVal || 0), 0);
  const totalPL = currentValue - totalInvestment;
  const plPercentage = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

  // Group holdings by sector
  const getSector = (name) => {
    const symbol = String(name || "").toUpperCase();
    if (["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"].some((s) => symbol.includes(s)))
      return "Financials";
    if (["INFY", "TCS", "WIPRO", "HCLTECH", "TECHM"].some((s) => symbol.includes(s)))
      return "IT / Tech";
    if (["RELIANCE", "ONGC", "BPCL", "IOC", "GAIL"].some((s) => symbol.includes(s)))
      return "Energy";
    if (["TATAMOTORS", "MARUTI", "M&M", "HEROMOTOCO"].some((s) => symbol.includes(s)))
      return "Automotive";
    if (["SUNPHARMA", "CIPLA", "DRREDDY", "APOLLOHOSP"].some((s) => symbol.includes(s)))
      return "Healthcare";
    return "Other";
  };

  const sectorMap = {};
  AllHoldings.forEach((h) => {
    const s = getSector(h.name);
    sectorMap[s] = (sectorMap[s] || 0) + (h.curVal || 0);
  });

  const sectors = Object.keys(sectorMap).map((sector) => {
    const val = sectorMap[sector];
    const pct = currentValue > 0 ? Math.round((val / currentValue) * 100) : 0;
    return { name: sector, val, pct };
  }).sort((a, b) => b.val - a.val);

  // High holding concentration check
  const maxHolding = AllHoldings.length > 0 
    ? [...AllHoldings].sort((a, b) => (b.curVal || 0) - (a.curVal || 0))[0]
    : null;
  const maxHoldingPct = maxHolding && currentValue > 0 ? Math.round((maxHolding.curVal / currentValue) * 100) : 0;

  // Determine Portfolio Risk Score
  let riskRating = "Balanced (Moderate)";
  let riskClass = "moderate";
  let riskDesc = "Your portfolio is well-balanced across multiple instruments.";
  if (maxHoldingPct > 40) {
    riskRating = "Aggressive (High Risk)";
    riskClass = "high";
    riskDesc = `Highly concentrated in ${maxHolding?.name} (${maxHoldingPct}%). High exposure to single stock volatility.`;
  } else if (sectors.length >= 4) {
    riskRating = "Conservative (Low Risk)";
    riskClass = "low";
    riskDesc = "Excellent diversification across 4 or more industry sectors.";
  }

  // Identify top gainers / losers
  const topGainer = AllHoldings.length > 0
    ? [...AllHoldings].sort((a, b) => (b.pl || 0) - (a.pl || 0))[0]
    : null;
  const topLoser = AllHoldings.length > 0
    ? [...AllHoldings].sort((a, b) => (a.pl || 0) - (b.pl || 0))[0]
    : null;

  const formatCurrency = (val) => {
    return val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <div className="holdings-container">
      <div className="holdings-stats">
        <div className="stat-card">
          <span className="stat-label">Total Investment</span>
          <span className="stat-value">{formatCurrency(totalInvestment)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Current Value</span>
          <span className="stat-value primary">{formatCurrency(currentValue)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total P&L</span>
          <div className="value-group">
            <span className={`stat-value ${totalPL >= 0 ? "secondary" : "negative"}`}>
              {totalPL >= 0 ? "+" : ""}{formatCurrency(totalPL)}
            </span>
            <span className={`stat-sub-value ${totalPL >= 0 ? "secondary" : "negative"}`}>
              ({totalPL >= 0 ? "+" : ""}{plPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Day's P&L</span>
          <div className="value-group">
            <span className="stat-value secondary">+₹842.10</span>
            <span className="stat-sub-value secondary">(+0.61%)</span>
          </div>
        </div>
      </div>

      <div className="holdings-table-wrapper">
        <div className="table-header">
          <h2>Holdings ({AllHoldings.length})</h2>
          <button className="btn-analyze" onClick={() => setIsModalOpen(true)}>
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
                  <td className="text-right font-mono">{formatCurrency(stock.avg)}</td>
                  <td className="text-right font-mono">{formatCurrency(stock.ltp)}</td>
                  <td className="text-right font-mono font-bold">{formatCurrency(stock.curVal)}</td>
                  <td className={`text-right font-mono font-bold ${stock.pl >= 0 ? "positive" : "negative"}`}>
                    {stock.pl >= 0 ? "+" : ""}{formatCurrency(stock.pl)}
                  </td>
                  <td className={`text-right font-mono font-bold ${stock.pl >= 0 ? "positive" : "negative"}`}>
                    {stock.chg}
                  </td>
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
          <p>
            {sectors.length > 0 
              ? `Your portfolio is currently ${sectors[0].pct}% weighted in ${sectors[0].name}. ${sectors.length < 3 ? "Diversifying into other sectors could reduce your volatility exposure." : "Your diversification spread is healthy."}`
              : "Invest in multiple sectors to receive automated insights here."
            }
          </p>
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

      {/* Portfolio Analysis Modal */}
      {isModalOpen && (
        <div className="analysis-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="analysis-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="title-wrapper">
                <span className="material-symbols-outlined primary">analytics</span>
                <h3>Portfolio Health Analysis</h3>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="modal-body">
              {AllHoldings.length === 0 ? (
                <div className="no-data-modal">
                  <p>Add instruments to your holdings to perform a dynamic portfolio analysis.</p>
                </div>
              ) : (
                <div className="analysis-grid">
                  {/* Left Column: Risk & Summary */}
                  <div className="analysis-col">
                    <div className="summary-block">
                      <span className="label">Total Wealth</span>
                      <h4 className="value">{formatCurrency(currentValue)}</h4>
                    </div>

                    <div className="risk-indicator-block">
                      <span className="label">Risk Profile Rating</span>
                      <div className={`risk-tag ${riskClass}`}>
                        {riskRating}
                      </div>
                      <p className="desc">{riskDesc}</p>
                    </div>

                    <div className="movers-block">
                      <span className="label">Top Performance Leaders</span>
                      {topGainer && (
                        <div className="leader-item positive">
                          <span className="material-symbols-outlined">trending_up</span>
                          <div className="leader-info">
                            <span className="stock">{topGainer.name}</span>
                            <span className="value">+{formatCurrency(topGainer.pl)} ({topGainer.chg})</span>
                          </div>
                        </div>
                      )}
                      {topLoser && topLoser !== topGainer && (
                        <div className="leader-item negative">
                          <span className="material-symbols-outlined">trending_down</span>
                          <div className="leader-info">
                            <span className="stock">{topLoser.name}</span>
                            <span className="value">{formatCurrency(topLoser.pl)} ({topLoser.chg})</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Sector Spread */}
                  <div className="analysis-col">
                    <span className="label">Sector Allocations</span>
                    <div className="allocations-list">
                      {sectors.map((sec, idx) => (
                        <div key={idx} className="alloc-row">
                          <div className="alloc-header">
                            <span className="sec-name">{sec.name}</span>
                            <span className="sec-val">{formatCurrency(sec.val)} ({sec.pct}%)</span>
                          </div>
                          <div className="bar-bg">
                            <div 
                              className="bar-fill" 
                              style={{ 
                                width: `${sec.pct}%`,
                                backgroundColor: sec.name === "IT / Tech" ? "var(--color-primary)" : 
                                                 sec.name === "Financials" ? "var(--color-secondary)" : 
                                                 sec.name === "Energy" ? "var(--color-error)" : "#a855f7"
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="analysis-summary-box">
                      <h5>Diversification Score</h5>
                      <div className="metric-row">
                        <span className="metric-lbl">Unique Sectors</span>
                        <span className="metric-val">{sectors.length}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-lbl">Diversification Spread</span>
                        <span className="metric-val text-primary" style={{ fontWeight: "700" }}>
                          {sectors.length >= 4 ? "Excellent" : sectors.length >= 3 ? "Good" : "Concentrated"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holdings;
