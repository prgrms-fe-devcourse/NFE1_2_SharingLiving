import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './components/Home'; 
import Login from './components/authentication/component/Login'; 
import Signup from './components/authentication/component/Signup'; 

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    );
}

export default App;