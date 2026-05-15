import React from 'react';

function Ecosystem() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="headline-lg text-on-background mb-4">Our Ecosystem</h2>
        <p className="body-lg text-on-surface-variant max-w-2xl mx-auto">Comprehensive tools designed for every type of investor. From day trading to long-term wealth building, we have you covered.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card">
          <div className="icon-container">
            <span className="material-symbols-outlined">candlestick_chart</span>
          </div>
          <h3 className="card-title text-on-background title-lg mb-2">Zest Pro</h3>
          <p className="body-md text-on-surface-variant">Advanced trading terminal for power users with real-time data, complex charting, and direct market access.</p>
        </div>
        <div className="card">
          <div className="icon-container">
            <span className="material-symbols-outlined">savings</span>
          </div>
          <h3 className="card-title text-on-background title-lg mb-2">Zest Invest</h3>
          <p className="body-md text-on-surface-variant">Simplified platform for long-term wealth building. Mutual funds, ETFs, and automated SIPs.</p>
        </div>
        <div className="card">
          <div className="icon-container">
            <span className="material-symbols-outlined">smartphone</span>
          </div>
          <h3 className="card-title text-on-background title-lg mb-2">Zest Mobile</h3>
          <p className="body-md text-on-surface-variant">Trade on the go with our lightning-fast mobile application. Available on iOS and Android.</p>
        </div>
      </div>
    </section>
  );
}

export default Ecosystem;
