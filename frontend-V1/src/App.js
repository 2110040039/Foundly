import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReportItem from './components/ReportItem';
import MyActivity from './components/MyActivity';
import HomePage from './components/HomePage';
import AboutUs from './components/About';
import AuthBox from './components/AuthBox';
import { useAuth } from './context/AuthContext';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';

import './styles/HomePage.css';
//k
const RequireAuth = ({ children }) => {
  const { isLoggedIn, setShowAuthBox } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    return children;
  } else {
    setTimeout(() => setShowAuthBox(true), 0);
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

const App = () => {
  const { showAuthBox, setShowAuthBox, handleAuthSuccess } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/report" element={<RequireAuth><ReportItem /></RequireAuth>} />
        <Route path="/my-activity" element={<RequireAuth><MyActivity /></RequireAuth>} />
        <Route path="/lost-items" element={<RequireAuth><LostItems /></RequireAuth>} />
        <Route path="/found-items" element={<RequireAuth><FoundItems /></RequireAuth>} />
      </Routes>

      <AuthBox
        isOpen={showAuthBox}
        onClose={() => setShowAuthBox(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;
