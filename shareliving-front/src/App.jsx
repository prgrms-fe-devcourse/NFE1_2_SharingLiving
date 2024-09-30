import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/css/style.css';
import Layout from './components/layouts/Layout';
import LandingPage from './components/LandingPage';

import Home from './pages/Home';
import Knowledge from './pages/knowledge';
import Product from './pages/product';

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </Router>
        <LandingPage />
      </Layout>
    </>
  );
}

export default App;