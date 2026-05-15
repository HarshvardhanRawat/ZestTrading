import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';
import Brokerage from './brokerage';

function PricingPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased">
      <Navbar />
      <main>
        <Hero />
        <Brokerage />
      </main>
      <Footer />
    </div>
  );
}

export default PricingPage;
