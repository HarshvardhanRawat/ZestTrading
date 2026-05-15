import React from 'react';

function Pricing() {
  return (
    <section className="bg-surface py-20">
      <div className="container text-center">
        <h2 className="headline-lg text-on-background mb-12">Transparent pricing, no surprises</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1 card ambient-shadow" style={{ padding: "2.5rem" }}>
            <h3 className="display-lg text-primary mb-2">₹0</h3>
            <p className="title-lg text-on-background mb-2">Brokerage</p>
            <p className="body-md text-on-surface-variant">on equity delivery investments</p>
          </div>
          <div className="flex-1 card ambient-shadow" style={{ padding: "2.5rem" }}>
            <h3 className="display-lg text-primary mb-2">Flat ₹20</h3>
            <p className="title-lg text-on-background mb-2">Per Order</p>
            <p className="body-md text-on-surface-variant">on intraday and F&amp;O trades</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
