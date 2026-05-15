import React from 'react';

function Hero() {
  return (
    <section className="product-page-section product-hero">
      <h1 className="display-lg text-on-background product-hero-title">
        Powerful tools for every investor.
      </h1>
      <p className="body-lg text-on-surface-variant product-hero-subtitle">
        Experience lightning-fast execution, advanced charting, and institutional-grade data, all wrapped in an interface designed for clarity and control.
      </p>
      <button className="btn btn-primary btn-large font-title-lg" style={{ marginTop: '1rem' }}>
        Get Started
      </button>
    </section>
  );
}

export default Hero;
