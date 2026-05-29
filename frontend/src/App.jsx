import React from 'react';
import HomePage from './landing_page/home/homePage';
import AboutPage from './landing_page/about/aboutPage';
import SignupPage from './landing_page/signup/signupPage';
import LoginPage from './landing_page/login/loginPage';
import ProductPage from './landing_page/products/productPage';
import PricingPage from './landing_page/pricing/pricingPage';
import SupportPage from './landing_page/support/supportPage';
import NotFound from './landing_page/NotFound';
import Dashboard from './user_page/dashboard/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
