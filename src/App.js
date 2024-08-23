import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Callb from './components/Callb';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
      
    
        <Routes>
          <Route path="/callb" element={<Callb />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
