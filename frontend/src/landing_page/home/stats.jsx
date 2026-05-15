import React from 'react';

function Stats() {
  return (
    <section className="bg-surface py-12">
      <hr></hr>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-5">
        <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: "2rem" }}>group</span>
          <h3 className="headline-md text-on-background">10M+</h3>
          <p className="body-md text-on-surface-variant">Active Users</p>
        </div>
        <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: "2rem" }}>currency_exchange</span>
          <h3 className="headline-md text-on-background">$50B+</h3>
          <p className="body-md text-on-surface-variant">Monthly Volume</p>
        </div>
        <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: "2rem" }}>account_balance</span>
          <h3 className="headline-md text-on-background">$100B+</h3>
          <p className="body-md text-on-surface-variant">Assets Managed</p>
        </div>
        <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span className="material-symbols-outlined text-primary mb-2" style={{ fontSize: "2rem" }}>verified</span>
          <h3 className="headline-md text-on-background">12+</h3>
          <p className="body-md text-on-surface-variant">Years of Trust</p>
        </div>
      </div>
      <hr></hr>
    </section>
  );
}

export default Stats;
