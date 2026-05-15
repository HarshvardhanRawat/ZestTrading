import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="container hero-section flex flex-col md:flex-row items-center gap-12 py-20">
      <div className="flex-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h1 className="display-lg text-on-background">Invest smarter. <br/><span className="text-primary">Trade faster.</span></h1>
        <p className="body-lg text-on-surface-variant max-w-lg">
          Experience seamless trading and investing with our zero-brokerage platform. Built for performance, designed for clarity. Take control of your financial future today.
        </p>
        <div className="flex flex-col md:flex-row gap-4" style={{ paddingTop: "1rem" }}>
          <Link to="/signup" className="btn btn-primary btn-large title-lg">Signup</Link>
          <Link to="/product" className="btn btn-outline btn-large title-lg">Explore Products</Link>
        </div>
      </div>
      <div className="flex-1 w-full relative">
        <div className="card" style={{ padding: "1.5rem" }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="label-md text-on-surface-variant">Portfolio Value</p>
              <h2 className="headline-lg text-on-background">$124,567.89</h2>
            </div>
            <div className="text-right">
              <p className="label-md text-on-surface-variant">Today's Return</p>
              <p className="title-lg text-secondary flex items-center justify-end"><span className="material-symbols-outlined" style={{ marginRight: "4px" }}>trending_up</span> +$1,234.56 (+1.01%)</p>
            </div>
          </div>
          <img alt="Financial Chart" className="w-full rounded-lg border border-surface-variant" style={{ height: "12rem", objectFit: "cover", opacity: 0.8 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2jeGpSlm0kH8f19AUifdcegf213aeaydswoCh1PnuBo2_dXTH_bPA_b1kd-vj8Iu9TPhCEmvx3FMtWJ49waOPlEJMRaARa_pMTgvf1vPO0Q72MfYY0x3c5L5fb-BBFwfdaRG5Bq7RzjJW8_rYae-bz-BrgQlxiPBRDbZ4aPnFXFEeCidCl73EzV37f09Ct4qtqfBKP7-x4KFXjXWaU5qmhHXg8Q-xb2DY8LpN4M2HyawOpvHVw9WTRtUGEzUnwIy9U8Jk1Hob8EI"/>
        </div>
      </div>
    </section>
  );
}

export default Hero;
