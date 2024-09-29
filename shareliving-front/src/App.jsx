import './assets/css/style.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Knowledge from './pages/Knowledge'; 
import Product from './pages/Product'; 

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;