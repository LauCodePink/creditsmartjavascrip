import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Simulator from './Pages/Simulador';
import Request from './Pages/Solicitud';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulador" element={<Simulator />} />
          <Route path="/solicitud" element={<Request />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;