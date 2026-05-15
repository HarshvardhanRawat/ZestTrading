import React from 'react';

function Hero() {
  return (
    <section className="about-hero">
      <div className="about-hero-copy">
        <span className="eyebrow">About Zest</span>
        <h1>Our mission is to democratize finance.</h1>
        <p>At Zest, we're building the future of investing. We believe everyone should have access to the tools and knowledge needed to build wealth.</p>
      </div>
      <div className="hero-image-card">
        <div className="hero-image-gradient"></div>
        <img alt="Abstract representation of growth" className="hero-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvPvyCUlBjEidhcBP3XdJXklrzdwp3GrEpkPQx3ubMKaNfxr0qYSdJ6IShwjESeuQ6s8BAkMQto0ziBWeWZYCmWPfhYedM3s_wkDx-wTj37_kxHZUoakrgvkXk3pYuyBAiW1P4kf-LXgjvNIAIqshpOpjp4cVMowxVwbDUnEgs4qHD04QBokvtzifREJowg_OvEU9DN0P5zN0f133B9XJFbXY1MJ85fS-K6NKiYIbpAmltg2YdA-GWyXwRvPTCQQTxo6-I4qvgEn0" />
      </div>
    </section>
  );
}

export default Hero;
