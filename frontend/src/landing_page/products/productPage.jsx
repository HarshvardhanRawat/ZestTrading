import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import Hero from './hero';
import LeftImg from './leftImg';
import RightImg from './rightImg';
import Universe from './universe';
import './product.css';

function ProductPage() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="flex-grow" style={{ marginTop: '64px' }}>
        <Hero />
        <LeftImg />
        <RightImg />
        <Universe />
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
