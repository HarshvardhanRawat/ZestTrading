import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-surface-variant body-md mt-4" style={{ color: "var(--color-on-surface-variant)" }}>
      <br></br>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-10 py-8">
        <div className="mb-8" style={{ gridColumn: "span 2" }}>
          <span className="title-lg text-on-background mb-4" style={{ display: "block", fontWeight: "bold" }}>Zest</span>
          <p className="mb-6">Empowering investors with institutional-grade tools and zero-brokerage trading.</p>
        </div>
        <div>
          <h4 className="body-lg text-on-background mb-4" style={{ fontWeight: 600 }}>Company</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><a className="nav-link" href="#">About Us</a></li>
            <li><a className="nav-link" href="#">Careers</a></li>
            <li><a className="nav-link" href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="body-lg text-on-background mb-4" style={{ fontWeight: 600 }}>Products</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><a className="nav-link" href="#">Zest Pro</a></li>
            <li><a className="nav-link" href="#">Zest Invest</a></li>
            <li><a className="nav-link" href="#">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="body-lg text-on-background mb-4" style={{ fontWeight: 600 }}>Support</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><a className="nav-link" href="#">Help Center</a></li>
            <li><a className="nav-link" href="#">Contact Us</a></li>
            <li><a className="nav-link" href="#">Trust &amp; Safety</a></li>
          </ul>
        </div>
        <div className="mt-5 pt-8 border-t border-surface-variant label-md text-center" style={{ gridColumn: "1 / -1" }}>
          <p>© 2025 Zest Financial Inc. Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
