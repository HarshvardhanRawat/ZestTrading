import React from 'react';
import './style.css';

function Hero() {
  return (
    <section className="pricing-hero relative py-xl overflow-hidden animate-fade-in-up">
      <div className="pricing-hero-content max-w-7xl mx-auto px-margin text-center">
        <div className="animate-fade-in-up delay-100 mb-md">
          <h1 className="font-display-lg text-display-lg text-gradient">Simple, transparent pricing</h1>
        </div>
        <p className="font-headline-md text-headline-md text-on-surface-variant max-w-2xl mx-auto animate-fade-in-up delay-200">
          No hidden charges, no complicated tiers. Only straightforward costs designed for serious investors.
        </p>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-blob delay-200"></div>
    </section>
  );
}

export default Hero;
