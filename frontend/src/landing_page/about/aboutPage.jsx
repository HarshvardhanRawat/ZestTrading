import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';
import Team from './team';
import './about.css';

function AboutPage() {
  return (
    <div className="about-page bg-background text-on-surface body-md">
      <Navbar />
      <main className="about-main container pt-24 pb-16">
        <Hero />
        <Team />
      </main>
      <hr />
      <Footer />
    </div>
  );
}

export default AboutPage;
