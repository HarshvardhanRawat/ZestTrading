import React from "react";

const Summary = () => {
  return (
    <div className="summary-container">
      {/* Portfolio Hero Card */}
      <section className="portfolio-section">
        <div className="portfolio-card">
          <div className="card-decoration-1"></div>
          <div className="card-decoration-2"></div>
          <span className="card-label">Portfolio Value</span>
          <h2 className="portfolio-amount">₹ 14,82,490.65</h2>
          <div className="portfolio-change">
            <span className="material-symbols-outlined">trending_up</span>
            <span className="change-text">+₹ 12,450.00 (0.84%) Today</span>
          </div>
        </div>
        <div className="trend-card">
          <div className="card-header">
            <h3>Trend Overview</h3>
            <div className="time-filters">
              <button className="active">1D</button>
              <button>1W</button>
              <button>1M</button>
              <button>1Y</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "var(--color-secondary)", stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: "var(--color-secondary)", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d="M0,80 Q10,75 20,85 T40,60 T60,70 T80,30 T100,40 L100,100 L0,100 Z" fill="url(#chartGradient)" />
              <path d="M0,80 Q10,75 20,85 T40,60 T60,70 T80,30 T100,40" fill="none" stroke="var(--color-secondary)" strokeWidth="2" />
            </svg>
            <div className="placeholder-text">Interactive Chart Area Placeholder</div>
          </div>
        </div>
      </section>

      {/* Widgets Grid */}
      <div className="widgets-grid">
        {/* Market Overview */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>Market Overview</h3>
            <span className="material-symbols-outlined icon-btn">more_horiz</span>
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
            <a href="#" className="view-all">View All</a>
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
              <tr>
                <td>
                  <div className="stock-name">HDFCBANK</div>
                  <div className="stock-qty">Qty: 50</div>
                </td>
                <td>
                  <span className="badge buy">BUY</span>
                </td>
                <td className="text-right status executed">Executed</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-name">INFY</div>
                  <div className="stock-qty">Qty: 25</div>
                </td>
                <td>
                  <span className="badge sell">SELL</span>
                </td>
                <td className="text-right status pending">Pending</td>
              </tr>
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
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-surface-variant)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="40 100" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-secondary)" strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-40" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-error)" strokeWidth="3" strokeDasharray="20 100" strokeDashoffset="-70" />
              </svg>
              <div className="chart-center">
                <span className="percentage">74%</span>
              </div>
            </div>
            <div className="legend-grid">
              <div className="legend-item">
                <div className="dot primary"></div>
                <span>Financials (40%)</span>
              </div>
              <div className="legend-item">
                <div className="dot secondary"></div>
                <span>IT (30%)</span>
              </div>
              <div className="legend-item">
                <div className="dot tertiary"></div>
                <span>Energy (20%)</span>
              </div>
              <div className="legend-item">
                <div className="dot surface"></div>
                <span>Other (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <section className="intelligence-section">
        <h3 className="section-title">Market Intelligence</h3>
        <div className="intelligence-grid">
          <div className="featured-news">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXH4ASzny0iwElzEWR1_zi-qcRwGod6gcTKfN2inwGieTbNct459tQau2DCiPOWIaaHa1QWs4y76kCfIaNiT1ANBd9D27403NtfihtlwmCWS4D3g6mRrbKie7Tp1FDPZU2Q3U7xZETioXtX5MAHl7g3jDYqqZlMVcZ2g2mw8f-olk6qj_w92dTi8MBa5xj2oMlbKD9OgxKHl3cAc-6ioAmQI2Bh7zdo3e7w1ZEXjR3GI1xUEKH8MDV-ZQiSg_XDDKxXHsNGYuIAUs" alt="Market Analysis" />
            <div className="news-overlay">
              <span className="featured-badge">FEATURED</span>
              <h4>RBI Monetary Policy: What to expect in the upcoming session?</h4>
              <p>Analyzing the impact of potential repo rate shifts on banking sector stocks.</p>
            </div>
          </div>
          <div className="news-card">
            <p className="card-tag primary">ANALYST VIEW</p>
            <h4>Tech sector outlook remains bullish despite global headwinds.</h4>
            <button className="read-more">
              Read Report <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="news-card">
            <p className="card-tag secondary">IPO WATCH</p>
            <h4>Three new listings to watch for in the coming week.</h4>
            <button className="read-more">
              Learn More <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Summary;
