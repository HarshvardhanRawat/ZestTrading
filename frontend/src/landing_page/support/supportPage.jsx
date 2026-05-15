import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';
import RaiseTicket from './raiseTicket';

function SupportPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased">
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <RaiseTicket />
      </main>
      <Footer />
    </div>
  );
}

export default SupportPage;
