import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
  return (
    <section className="container py-20">
      <div className="bg-primary rounded-2xl p-12 text-center ambient-shadow flex flex-col items-center">
        <h2 className="headline-lg text-white mb-6">Open a Zest account today</h2>
        <p className="body-lg mb-8 max-w-xl" style={{ color: "var(--color-primary-fixed)" }}>Join millions of investors and start your wealth creation journey with our powerful, intuitive platform.</p>
        <Link to="/signup" className="btn title-lg bg-white text-primary" style={{ padding: "1rem 2.5rem" }}>Signup Now</Link>
      </div>
    </section>
  );
}

export default OpenAccount;
