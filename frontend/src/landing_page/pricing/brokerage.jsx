import React from 'react';
import OpenAccount from '../openAccount';
import './style.css';

function Brokerage() {
  return (
    <>
      {/* Brokerage Section (Bento Inspired Cards) */}
      <section className="pricing-brokerage-section py-lg bg-surface">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="pricing-card-grid grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Equity Delivery */}
            <div className="premium-card p-md rounded-xl flex flex-col items-center text-center hover-scale animate-fade-in-up delay-100">
              <div className="w-16 h-16 bg-primary-fixed text-on-primary-fixed-variant rounded-full flex items-center justify-center mb-md">
                <span className="material-symbols-outlined scale-150">analytics</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">Equity Delivery</h3>
              <div className="text-primary font-bold text-[40px] leading-tight mb-xs">₹0</div>
              <p className="font-body-md text-body-md text-on-surface-variant">Free equity delivery for life across all major exchanges.</p>
            </div>
            {/* Intraday and F&O */}
            <div className="premium-card popular-card p-md rounded-xl flex flex-col items-center text-center relative hover-scale animate-fade-in-up delay-200">
              <div className="absolute top-0 right-0 p-2">
                <span className="popular-badge text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">POPULAR</span>
              </div>
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mb-md">
                <span className="material-symbols-outlined scale-150" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">Intraday and F&amp;O</h3>
              <div className="text-primary font-bold text-[40px] leading-tight mb-xs">₹20</div>
              <p className="font-body-md text-body-md text-on-surface-variant">Flat ₹20 per executed order for Intraday, Futures &amp; Options.</p>
            </div>
            {/* Mutual Funds */}
            <div className="premium-card p-md rounded-xl flex flex-col items-center text-center hover-scale animate-fade-in-up delay-300">
              <div className="w-16 h-16 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full flex items-center justify-center mb-md">
                <span className="material-symbols-outlined scale-150">account_balance_wallet</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">Mutual Funds</h3>
              <div className="text-primary font-bold text-[40px] leading-tight mb-xs">₹0</div>
              <p className="font-body-md text-body-md text-on-surface-variant">Zero commissions on direct mutual funds. No hidden platform fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Charges Table */}
      <section className="py-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="pricing-summary flex flex-col gap-md mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Detailed Charges Breakdown</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Regulatory and statutory charges are levied by the government and exchanges.</p>
          </div>
          <div className="pricing-table-container overflow-x-auto animate-fade-in-up delay-400">
            <table className="w-full text-left border-collapse bg-surface-container-lowest">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Charges</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Equity Delivery</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Equity Intraday</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Equity Futures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="table-row-hover">
                  <td className="p-md font-body-md text-body-md text-on-surface">STT / CTT</td>
                  <td className="p-md font-data-mono text-data-mono">0.1% on buy &amp; sell</td>
                  <td className="p-md font-data-mono text-data-mono">0.025% on sell side</td>
                  <td className="p-md font-data-mono text-data-mono">0.01% on sell side</td>
                </tr>
                <tr className="table-row-hover">
                  <td className="p-md font-body-md text-body-md text-on-surface">Transaction Charges</td>
                  <td className="p-md font-data-mono text-data-mono">NSE: 0.00345%</td>
                  <td className="p-md font-data-mono text-data-mono">NSE: 0.00345%</td>
                  <td className="p-md font-data-mono text-data-mono">NSE: 0.0019%</td>
                </tr>
                <tr className="table-row-hover">
                  <td className="p-md font-body-md text-body-md text-on-surface">GST</td>
                  <td className="p-md font-data-mono text-data-mono">18% on (Brokerage + SEBI)</td>
                  <td className="p-md font-data-mono text-data-mono">18% on (Brokerage + SEBI)</td>
                  <td className="p-md font-data-mono text-data-mono">18% on (Brokerage + SEBI)</td>
                </tr>
                <tr className="table-row-hover">
                  <td className="p-md font-body-md text-body-md text-on-surface">SEBI Charges</td>
                  <td className="p-md font-data-mono text-data-mono">₹10 / crore</td>
                  <td className="p-md font-data-mono text-data-mono">₹10 / crore</td>
                  <td className="p-md font-data-mono text-data-mono">₹10 / crore</td>
                </tr>
                <tr className="table-row-hover">
                  <td className="p-md font-body-md text-body-md text-on-surface">Stamp Charges</td>
                  <td className="p-md font-data-mono text-data-mono">0.015% or ₹1500 / crore</td>
                  <td className="p-md font-data-mono text-data-mono">0.003% or ₹300 / crore</td>
                  <td className="p-md font-data-mono text-data-mono">0.002% or ₹200 / crore</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <OpenAccount />
      <hr></hr>
    </>
  );
}

export default Brokerage;
