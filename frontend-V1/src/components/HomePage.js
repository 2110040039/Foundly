import React from 'react';
import Categories from './Categories';
import Testimonials from './Testimonials';
import { useNavigate } from 'react-router-dom'; //Import useNavigate
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();  // Initialize useNavigate

  return (
    <div className="homepage-container">
      <header className="App-header">
        <h1 className="app-title">Foundly</h1>
        <p className="app-subtitle">
          <span className="lost">Lost It</span> • <span className="list">List It</span> • <span className="find">Find It</span>
        </p>
        <button
          className="report-button"
          onClick={() => navigate('/report')}  //Use navigate instead of window.location.href
        >
          Report ➜
        </button>
        <div className="tabs">
          <button className="tab" onClick={() => navigate('/')}>  
            Lost Items
          </button>
          <button className="tab" onClick={() => navigate('/')}>   
            Found Items
          </button>
          <button
            className="tab"
            onClick={() => navigate('/my-activity')}   //Use navigate
            >
            My Activity
          </button>
        </div>
      </header>
      <div className="search-bar-section">
        <input type="text" className="search-bar" placeholder="Search" />
      </div>
      <div>
      <Categories />
      </div>
      <Testimonials />
    </div>
  );
}

export default HomePage;