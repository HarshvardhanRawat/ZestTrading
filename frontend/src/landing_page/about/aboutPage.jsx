import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';

import './about.css';

function AboutPage() {
  return (
    <div className="about-page bg-background text-on-surface body-md">
      <Navbar />
      <main className="about-main container pt-24 pb-16">
        <Hero />
      </main>
      <hr />
      <Footer />
    </div>
  );
}

export default AboutPage;
