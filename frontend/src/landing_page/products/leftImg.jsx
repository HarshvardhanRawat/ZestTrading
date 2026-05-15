import React from 'react';

function LeftImg() {
  return (
    <section className="product-page-section product-feature-section">
      <div className="product-feature-row">
        <div className="product-feature-image-container">
          <div className="product-feature-image-wrapper">
            <img 
              alt="Zest Pro Terminal" 
              className="w-full h-auto object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzdVHHzdqyvkNz4Mnh3IaCdiVkINbkgma9IQ3RACanEqfAydFi7VOc45jmYhwssBsuAUlc0J-mTpTvO6lpCG1rJV99xQ5oNfxD9LvKCEXPJYvqh5Y8kPbvSHwURiBOww8AifTzAYBriumFfUhZjWFvo61EOdX3xpZf4DjagJFFnruXOHZYu-LaOyPG3LFYMecTVGrp-4MedDFTQFv6Cc3bQmSOOpaxkqzp8gBPQm3aW8Ig5ulow8SiXJw1bx6IymUi3r43P_C7-WQ"
            />
          </div>
        </div>
        
        <div className="product-feature-content">
          <h2 className="headline-lg text-on-background">Zest Pro Terminal</h2>
          <p className="body-lg text-on-surface-variant">
            Gain the edge with our institutional-grade desktop platform. Access deep liquidity, customize complex multi-chart layouts, and execute advanced order types with sub-millisecond latency.
          </p>
          
          <ul className="product-feature-list">
            <li className="product-feature-list-item">
              <div className="product-feature-list-icon">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <div>
                <h3 className="title-lg text-on-background">Advanced Charting</h3>
                <p className="body-md text-on-surface-variant mt-2">100+ technical indicators and drawing tools.</p>
              </div>
            </li>
            <li className="product-feature-list-item">
              <div className="product-feature-list-icon">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <h3 className="title-lg text-on-background">Real-Time Data</h3>
                <p className="body-md text-on-surface-variant mt-2">Level 2 market depth and tick-by-tick updates.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LeftImg;
