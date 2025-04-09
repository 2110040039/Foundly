import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReportItem from './components/ReportItem';
import MyActivity from './components/MyActivity';
import HomePage from './components/HomePage';
import AboutUs from './components/About';
import Dashboard from './components/Dashboard';
import './styles/HomePage.css';

const App = () => {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/my-activity" element={<MyActivity />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div> 
  );
};
export default App;
