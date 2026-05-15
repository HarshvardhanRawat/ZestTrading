import React from 'react';
import './style.css';

function Hero() {
  return (
    <>
      <section className="support-hero">
        <div className="support-hero-grid max-w-7xl mx-auto px-margin support-hero-layout">
          <div>
            <span className="support-hero-badge">24 / 7 dedicated support</span>
            <h1 className="display-lg text-on-surface mb-6">Get help faster with Zest support.</h1>
            <p className="body-lg text-on-surface-variant mb-8">Search our knowledge base, explore common topics, or submit a ticket. We make every support interaction clear, fast, and reliable.</p>

            <div className="support-hero-stats mb-8">
              <div className="support-stat-card">
                <span className="stat-value">10m</span>
                <span className="stat-label">Avg. response time</span>
              </div>
              <div className="support-stat-card">
                <span className="stat-value">98%</span>
                <span className="stat-label">First-response rate</span>
              </div>
              <div className="support-stat-card">
                <span className="stat-value">4.9/5</span>
                <span className="stat-label">Customer satisfaction</span>
              </div>
            </div>

            <div className="support-hero-lead text-on-surface-variant body-md">
              <div className="support-hero-lead-item">
                <span className="material-symbols-outlined support-hero-icon">rocket_launch</span>
                <p>Instant help for trading and account access.</p>
              </div>
              <div className="support-hero-lead-item">
                <span className="material-symbols-outlined support-hero-icon">shield</span>
                <p>Secure answers from verified experts.</p>
              </div>
            </div>
          </div>

          <div className="support-search-card card support-hero-card">
            <p className="label-md text-on-surface-variant mb-3">Start with a search</p>
            <div className="support-search-input-wrapper">
              <span className="material-symbols-outlined support-search-icon">search</span>
              <input
                className="support-search-input"
                placeholder="Search help topics, articles, or FAQs"
                type="text"
              />
            </div>
            <div className="support-search-keywords mt-6">
              <span className="support-search-chip">Account access</span>
              <span className="support-search-chip">Funding</span>
              <span className="support-search-chip">Trading tools</span>
              <span className="support-search-chip">Security</span>
            </div>
          </div>
        </div>
      </section>

      <section className="support-categories px-margin max-w-7xl mx-auto py-xl">
        <div className="support-categories-header mb-8">
          <div>
            <h2 className="headline-md mb-2">Support categories</h2>
            <p className="body-md text-on-surface-variant max-w-xl">Quickly access the most common support topics and get back to trading with confidence.</p>
          </div>
          <a className="btn btn-outline hover-underline" href="#">View help center</a>
        </div>

        <div className="grid support-category-grid gap-6">
          <a className="support-category-card" href="#">
            <div className="support-category-icon bg-primary-fixed">
              <span className="material-symbols-outlined text-primary">person_check</span>
            </div>
            <h3 className="title-lg mb-2">Account access</h3>
            <p className="body-md text-on-surface-variant">Login issues, MFA, and verification.</p>
          </a>
          <a className="support-category-card" href="#">
            <div className="support-category-icon bg-primary-fixed">
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <h3 className="title-lg mb-2">Trading & markets</h3>
            <p className="body-md text-on-surface-variant">Order types, market hours, and execution.</p>
          </a>
          <a className="support-category-card" href="#">
            <div className="support-category-icon bg-primary-fixed">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
            </div>
            <h3 className="title-lg mb-2">Payments</h3>
            <p className="body-md text-on-surface-variant">Deposits, withdrawals, and billing.</p>
          </a>
          <a className="support-category-card" href="#">
            <div className="support-category-icon bg-primary-fixed">
              <span className="material-symbols-outlined text-primary">security</span>
            </div>
            <h3 className="title-lg mb-2">Security</h3>
            <p className="body-md text-on-surface-variant">Protection, compliance, and account safety.</p>
          </a>
        </div>
      </section>
    </>
  );
}

export default Hero;
