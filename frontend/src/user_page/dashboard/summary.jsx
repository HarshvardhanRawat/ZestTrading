import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../hooks/useTheme";

const TradingViewChart = ({ isDark }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const widgetId = "tradingview_advanced_chart_widget";
    const widgetContainer = document.createElement("div");
    widgetContainer.id = widgetId;
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";
    containerRef.current.appendChild(widgetContainer);

    const scriptId = "tradingview-tv-script";
    let script = document.getElementById(scriptId);

    const initWidget = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "NSE:NIFTY",
          interval: "D",
          timezone: "Asia/Kolkata",
          theme: isDark ? "dark" : "light",
          style: "1",
          locale: "en",
          toolbar_bg: isDark ? "#1c1d22" : "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: true,
          allow_symbol_change: true,
          container_id: widgetId,
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      if (window.TradingView) {
        initWidget();
      } else {
        script.addEventListener("load", initWidget);
      }
    }

    return () => {
      if (script) {
        script.removeEventListener("load", initWidget);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="tradingview-chart-container"
      style={{ width: "100%", height: "450px" }}
    />
  );
};

const TradingViewNews = ({ isDark }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "market",
      market: "stock",
      colorTheme: isDark ? "dark" : "light",
      isTransparent: true,
      displayMode: "regular",
      width: "100%",
      height: "400",
      locale: "en",
    });
    containerRef.current.appendChild(script);
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ width: "100%", height: "400px" }}
    />
  );
};

const Summary = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [hoveredSector, setHoveredSector] = useState(null);
  const [balance, setBalance] = useState(482910.45);
  const [usedMargin, setUsedMargin] = useState(120400.00);

  // Fetch orders, holdings and funds
  useEffect(() => {
    axios
      .get("http://localhost:3000/allOrders")
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });

    axios
      .get("http://localhost:3000/allHoldings")
      .then((res) => {
        setHoldings(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
      });

    axios
      .get("http://localhost:3000/getFunds")
      .then((res) => {
        setBalance(res.data.balance);
        setUsedMargin(res.data.usedMargin);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
      });
  }, []);

  // Map stock to sector
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

  const getSectorColor = (sectorName) => {
    switch (sectorName) {
      case "IT / Tech":
        return "var(--color-primary)";
      case "Financials":
        return "var(--color-secondary)";
      case "Energy":
        return "var(--color-error)";
      case "Automotive":
        return "#ffd043";
      case "Healthcare":
        return "#a855f7";
      default:
        return "var(--color-outline)";
    }
  };

  // Group holdings by sector
  const totalCurVal = holdings.reduce((sum, h) => sum + (h.curVal || 0), 0);
  const sectorMap = {};
  holdings.forEach((h) => {
    const s = getSector(h.name);
    sectorMap[s] = (sectorMap[s] || 0) + (h.curVal || 0);
  });

  const sectorsList = Object.keys(sectorMap).map((sector) => {
    const val = sectorMap[sector];
    const pct = totalCurVal > 0 ? Math.round((val / totalCurVal) * 100) : 0;
    return { name: sector, val, pct };
  }).sort((a, b) => b.val - a.val);

  // Fallback for pie chart if no holdings
  const fallbackSectors = [
    { name: "Financials", pct: 40, val: 592996.26 },
    { name: "IT / Tech", pct: 30, val: 444747.20 },
    { name: "Energy", pct: 20, val: 296498.13 },
    { name: "Other", pct: 10, val: 148249.07 },
  ];

  const activeSectors = sectorsList.length > 0 ? sectorsList : fallbackSectors;
  const activeTotalVal = totalCurVal > 0 ? totalCurVal : 1482490.65;

  // Calculate cumulative percentage for pie slices
  let cumulativePercent = 0;

  // Display top 3 recent orders
  const displayOrders = orders.slice(-3).reverse();

  // Dynamic portfolio analytics display
  const portfolioDisplayValue = activeTotalVal.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  return (
    <div className="summary-container">
      {/* Portfolio & Stats Row */}
      <section className="portfolio-section">
        <div className="portfolio-card">
          <div className="card-decoration-1"></div>
          <div className="card-decoration-2"></div>
          <span className="card-label">Portfolio Value</span>
          <h2 className="portfolio-amount">{portfolioDisplayValue}</h2>
          <div className="portfolio-change">
            <span className="material-symbols-outlined">trending_up</span>
            <span className="change-text">+₹ 12,450.00 (0.84%) Today</span>
          </div>
        </div>

        {/* Margin Status Card */}
        <div className="portfolio-card margin-status-card" style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }}>
          <div className="card-decoration-1"></div>
          <div className="card-decoration-2"></div>
          <span className="card-label" style={{ color: "var(--color-on-surface-variant)" }}>Available Margin</span>
          <h2 className="portfolio-amount" style={{ color: "var(--color-on-surface)" }}>
            {balance.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h2>
          <div className="portfolio-change">
            <span className="material-symbols-outlined" style={{ color: "var(--color-secondary)" }}>account_balance_wallet</span>
            <span className="change-text" style={{ color: "var(--color-on-surface-variant)", fontFamily: "inherit" }}>
              Used Margin: {usedMargin.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>

        {/* Positions Overview Card */}
        <div className="portfolio-card positions-status-card" style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-on-surface)", border: "1px solid var(--color-outline-variant)" }}>
          <div className="card-decoration-1"></div>
          <div className="card-decoration-2"></div>
          <span className="card-label" style={{ color: "var(--color-on-surface-variant)" }}>Active Holdings</span>
          <h2 className="portfolio-amount" style={{ color: "var(--color-on-surface)" }}>
            {holdings.length || 3} Stocks
          </h2>
          <div className="portfolio-change">
            <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>insights</span>
            <span className="change-text" style={{ color: "var(--color-on-surface-variant)", fontFamily: "inherit" }}>
              Total Orders Today: {orders.length || 2}
            </span>
          </div>
        </div>

        <div className="trend-card">
          <div className="card-header">
            <h3>Trend Overview</h3>
          </div>
          <div className="chart-placeholder" style={{ padding: "0" }}>
            <TradingViewChart isDark={isDark} />
          </div>
        </div>
      </section>

      {/* Widgets Grid */}
      <div className="widgets-grid">
        {/* Market Overview */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Market Overview</h3>
          </div>
          <div className="market-list">
            <div className="market-item">
              <div className="item-left">
                <div className="indicator primary"></div>
                <div>
                  <p className="market-name">NIFTY BANK</p>
                  <p className="market-value">47,214.35</p>
                </div>
              </div>
              <span className="market-change positive">+0.42%</span>
            </div>
            <div className="market-item">
              <div className="item-left">
                <div className="indicator tertiary"></div>
                <div>
                  <p className="market-name">INDIA VIX</p>
                  <p className="market-value">15.22</p>
                </div>
              </div>
              <span className="market-change negative">-1.24%</span>
            </div>
            <div className="market-item">
              <div className="item-left">
                <div className="indicator secondary"></div>
                <div>
                  <p className="market-name">NIFTY NEXT 50</p>
                  <p className="market-value">59,812.90</p>
                </div>
              </div>
              <span className="market-change positive">+1.05%</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Recent Orders</h3>
            <Link to="/dashboard/orders" className="view-all">
              View All
            </Link>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.length > 0 ? (
                displayOrders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <div className="stock-name">{order.instrument}</div>
                      <div className="stock-qty">Qty: {order.qty}</div>
                    </td>
                    <td>
                      <span className={`badge ${order.typeClass || (order.type === "BUY" ? "buy" : "sell")}`}>
                        {order.type}
                      </span>
                    </td>
                    <td className={`text-right status ${order.statusClass || order.status.toLowerCase()}`}>
                      {order.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "1.5rem", color: "var(--color-on-surface-variant)" }}>
                    No recent orders placed
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Equity Distribution */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Equity Distribution</h3>
            <span className="material-symbols-outlined icon-btn">pie_chart</span>
          </div>
          <div className="distribution-content">
            <div className="donut-chart">
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
                {/* Background Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.95"
                  fill="transparent"
                  stroke="var(--color-surface-container)"
                  strokeWidth="3.2"
                />
                {/* Slices */}
                {activeSectors.map((sector, idx) => {
                  const dashArray = `${sector.pct} 100`;
                  const dashOffset = -cumulativePercent;
                  cumulativePercent += sector.pct;

                  const isHovered = hoveredSector && hoveredSector.name === sector.name;

                  return (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="15.95"
                      fill="transparent"
                      stroke={getSectorColor(sector.name)}
                      strokeWidth={isHovered ? "4.5" : "3.2"}
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      style={{ transition: "stroke-width 0.2s ease, stroke 0.2s ease", cursor: "pointer" }}
                      onMouseEnter={() => setHoveredSector(sector)}
                      onMouseLeave={() => setHoveredSector(null)}
                    />
                  );
                })}
              </svg>
              <div
                className="chart-center"
                style={{
                  pointerEvents: "none"
                }}
              >
                <span className="percentage" style={{ fontSize: hoveredSector ? "16px" : "20px", fontWeight: "700" }}>
                  {hoveredSector ? `${hoveredSector.pct}%` : `${activeSectors[0]?.pct || 0}%`}
                </span>
                <span className="label" style={{ fontSize: "9px", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
                  {hoveredSector ? hoveredSector.name : (activeSectors[0]?.name || "Sectors")}
                </span>
              </div>
            </div>
            <div className="legend-grid">
              {activeSectors.map((sector, idx) => (
                <div
                  key={idx}
                  className="legend-item"
                  style={{
                    cursor: "pointer",
                    opacity: hoveredSector && hoveredSector.name !== sector.name ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredSector(sector)}
                  onMouseLeave={() => setHoveredSector(null)}
                >
                  <div
                    className="dot"
                    style={{
                      backgroundColor: getSectorColor(sector.name),
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>
                    {sector.name} ({sector.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <section className="intelligence-section">
        <h3 className="section-title">Market Intelligence</h3>
        <div className="intelligence-grid-full" style={{ marginTop: "1rem" }}>
          <TradingViewNews isDark={isDark} />
        </div>
      </section>
    </div>
  );
};

export default Summary;
