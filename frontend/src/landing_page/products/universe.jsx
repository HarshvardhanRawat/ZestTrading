import React from 'react';

function Universe() {
  return (
    <section className="universe-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="headline-lg text-on-background mb-4">The Zest Universe</h2>
          <p className="body-lg text-on-surface-variant max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            An integrated ecosystem of financial tools designed to scale with your ambitions, from automated investing to algorithmic trading.
          </p>
        </div>
        
        <div className="universe-grid">
          {/* Card 1 */}
          <div className="universe-card">
            <div className="universe-card-icon">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h3 className="title-lg text-on-background mb-3">Zest Invest</h3>
            <p className="body-md text-on-surface-variant" style={{ lineHeight: 1.6 }}>Automated portfolios and fractional shares for long-term wealth building.</p>
          </div>
          
          {/* Card 2 */}
          <div className="universe-card">
            <div className="universe-card-icon">
              <span className="material-symbols-outlined">query_stats</span>
            </div>
            <h3 className="title-lg text-on-background mb-3">Zest Pro</h3>
            <p className="body-md text-on-surface-variant" style={{ lineHeight: 1.6 }}>The ultimate desktop terminal for active traders requiring deep analytics.</p>
          </div>
          
          {/* Card 3 */}
          <div className="universe-card">
            <div className="universe-card-icon">
              <span className="material-symbols-outlined">smartphone</span>
            </div>
            <h3 className="title-lg text-on-background mb-3">Zest Mobile</h3>
            <p className="body-md text-on-surface-variant" style={{ lineHeight: 1.6 }}>Full-power trading and portfolio management in the palm of your hand.</p>
          </div>
          
          {/* Card 4 */}
          <div className="universe-card">
            <div className="universe-card-icon">
              <span className="material-symbols-outlined">api</span>
            </div>
            <h3 className="title-lg text-on-background mb-3">Zest API</h3>
            <p className="body-md text-on-surface-variant" style={{ lineHeight: 1.6 }}>Build custom trading algorithms and integrate with our high-speed execution engine.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Universe;
