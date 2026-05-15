import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';
import Stats from './stats';
import Ecosystem from './ecosystem';
import Pricing from './pricing';
import OpenAccount from '../openAccount';

function HomePage() {
  return (
    <div className="bg-background text-on-background body-md">
      <Navbar />
      <main className="pt-24 pb-16">
        <Hero />
        <Stats />
        <Ecosystem />
        <Pricing />
        <OpenAccount />
      </main>
      <hr></hr>
      <Footer />
    </div>
  );
}

export default HomePage;
