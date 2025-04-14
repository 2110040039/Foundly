
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Testimonials from '../components/Testimonials';
// import Navbar from '../components/Navbar'; // ✅ Shared navbar component
// import '../styles/HomePage.css';
// import backgroundImage from '../assets/img.png';

// function HomePage() {
//   const navigate = useNavigate();
//   const { isLoggedIn, setShowAuthBox } = useAuth();
//   const [isScrolledUp, setIsScrolledUp] = useState(false);

//   // ✅ Redirects authenticated users or shows login modal
//   const handleProtectedClick = (path) => {
//     if (isLoggedIn) {
//       setIsScrolledUp(true);
//       setTimeout(() => {
//         navigate(path);
//         setIsScrolledUp(false); // Reset after navigating
//       }, 600);
//     } else {
//       setShowAuthBox(true); // Show login/signup box
//     }
//   };

//   return (
//     <div className={`homepage-container ${isScrolledUp ? 'scrolled-up' : ''}`}>
//       <header
//         className="App-header"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         {/* ✅ Shared site-wide Navbar */}
//         <Navbar />

//         {/* ✅ Hero Section */}
//         <div className="hero-text">
//           <h1 className="main-title">Foundly</h1>
//           <div className="subtitle">
//             <span className="dot-label lost">Lost It</span>
//             <span className="dot-label list">List It</span>
//             <span className="dot-label find">Find It</span>
//           </div>

//           <div className="center-report">
//             <button className="report-btn" onClick={() => handleProtectedClick('/report')}>
//               Report ➜
//             </button>
//           </div>

//           <div className="tab-buttons">
//             <button className="tab pink" onClick={() => handleProtectedClick('/lost-items')}>
//               Lost Items
//             </button>
//             <button className="tab white" onClick={() => handleProtectedClick('/found-items')}>
//               Found Items
//             </button>
//             <button className="tab white" onClick={() => handleProtectedClick('/my-activity')}>
//               My Activity
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ✅ Testimonials Section */}
//       <section className="content-section">
//         <h2 className="section-heading">What users say</h2>
//         <Testimonials />
//       </section>
//     </div>
//   );
// }

// export default HomePage;




// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Testimonials from '../components/Testimonials';
// import Navbar from '../components/Navbar';
// import '../styles/HomePage.css';
// import '../styles/About.css';
// import backgroundImage from '../assets/img.png';

// // ✅ Import images correctly
// import signupImg from '../assets/signup.jpg';
// import notifyImg from '../assets/notify.jpg';
// import listoutImg from '../assets/listout.jpg';
// import teamImg from '../assets/team.jpg';

// function HomePage() {
//   const navigate = useNavigate();
//   const { isLoggedIn, setShowAuthBox } = useAuth();
//   const [isScrolledUp, setIsScrolledUp] = useState(false);
//   const aboutRef = useRef(null);

//   const scrollToAbout = () => {
//     if (aboutRef.current) {
//       aboutRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleProtectedClick = (path) => {
//     if (isLoggedIn) {
//       setIsScrolledUp(true);
//       setTimeout(() => {
//         navigate(path);
//         setIsScrolledUp(false);
//       }, 600);
//     } else {
//       setShowAuthBox(true);
//     }
//   };

//   return (
//     <div className={`homepage-container ${isScrolledUp ? 'scrolled-up' : ''}`}>
//       <header
//         className="App-header"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <Navbar onAboutClick={scrollToAbout} />

//         <div className="hero-text">
//           <h1 className="main-title">Foundly</h1>
//           <div className="subtitle">
//             <span className="dot-label lost">Lost It</span>
//             <span className="dot-label list">List It</span>
//             <span className="dot-label find">Find It</span>
//           </div>
//           <div className="center-report">
//             <button className="report-btn" onClick={() => handleProtectedClick('/report')}>
//               Report ➜
//             </button>
//           </div>
//           <div className="tab-buttons">
//             <button className="tab pink" onClick={() => handleProtectedClick('/lost-items')}>
//               Lost Items
//             </button>
//             <button className="tab white" onClick={() => handleProtectedClick('/found-items')}>
//               Found Items
//             </button>
//             <button className="tab white" onClick={() => handleProtectedClick('/my-activity')}>
//               My Activity
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ✅ About Us Section */}
//       <section ref={aboutRef} className="about-us-page">
//         <div className="about-flow">
//           <div className="text-section right">
//             <h2>What is Foundly?</h2>
//             <p>
//               Foundly is a smart and secure lost & found item management system built to reconnect people with their misplaced belongings. Whether you're a student who lost a water bottle or someone who found a misplaced ID card, Foundly makes the process of reporting, tracking, and returning items smooth, simple, and stress-free.
//             </p>

//             <h2>Why Foundly?</h2>
//             <p>
//               Losing something shouldn’t feel like the end of the world — and finding something shouldn’t be a dead end. We built Foundly to bridge the gap between seekers and finders in a more organized, transparent, and reliable way. No more missing notice boards, endless emails, or confusion — just fast, fair, and secure item recovery.
//             </p>
//           </div>

//           <div className="roadmap-vertical">
//             <div className="roadmap-step">
//               <img src={signupImg} alt="Sign up" />
//               <div className="step-label">Sign up</div>
//               <div className="curve-line vertical"></div>
//             </div>
//             <div className="roadmap-step">
//               <img src={listoutImg} alt="List out" />
//               <div className="step-label">List out</div>
//               <div className="curve-line vertical"></div>
//             </div>
//             <div className="roadmap-step">
//               <img src={notifyImg} alt="Get notified" />
//               <div className="step-label">Get notified</div>
//             </div>
//           </div>

//           <div className="features">
//             <h2>Key Features</h2>
//             <ul>
//               <li>📋 Report Items: Log lost or found items with details and images</li>
//               <li>👥 Role-Based Access: Dashboards for users and admins</li>
//               <li>🔔 Smart Notifications: Get alerted when your item is reported</li>
//               <li>🤝 Claim & Handover: Secure claiming and handover of items</li>
//               <li>📊 Dashboard Analytics: Insights into item reports</li>
//               <li>🔍 Filter & Search: Quickly find specific item reports</li>
//             </ul>
//           </div>

//           <div className="team">
//             <h2>Meet the Team</h2>
//             <p>
//               We are a group of passionate developers and problem-solvers who came together to build something that makes a real-world difference. With expertise in ReactJS, Spring Boot, MySQL, and a vision for smarter communities, Foundly is our way of bringing order to everyday chaos.
//             </p>
//             <img src={teamImg} alt="Meet the Team" />
//           </div>
//         </div>
//       </section>

//       {/* ✅ Testimonials Section */}
//       <section className="content-section">
//         <h2 className="section-heading">What users say</h2>
//         <Testimonials />
//       </section>
//     </div>
//   );
// }

// export default HomePage;

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';
import '../styles/About.css';
import backgroundImage from '../assets/img.png';

import signupImg from '../assets/signup.jpg';
import notifyImg from '../assets/notify.jpg';
import listoutImg from '../assets/listout.jpg';
import teamImg from '../assets/team.jpg';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setShowAuthBox } = useAuth();
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProtectedClick = (path) => {
    if (isLoggedIn) {
      setIsScrolledUp(true);
      setTimeout(() => {
        navigate(path);
        setIsScrolledUp(false);
      }, 600);
    } else {
      setShowAuthBox(true);
    }
  };

  // Scroll listener to set active section
  useEffect(() => {
    const handleScroll = () => {
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const scrollY = window.scrollY;
      setActiveSection(scrollY + window.innerHeight / 2 >= aboutTop ? 'about' : 'home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // set initially

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to About section if triggered from Navbar
  useEffect(() => {
    if (location.state?.scrollToAbout) {
      scrollToAbout();
    }
  }, [location]);

  return (
    <div className={`homepage-container ${isScrolledUp ? 'scrolled-up' : ''}`}>
      <header
        className="App-header"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Navbar onAboutClick={scrollToAbout} activeSection={activeSection} />

        <div className="hero-text">
          <h1 className="main-title">Foundly</h1>
          <div className="subtitle">
            <span className="dot-label lost">Lost It</span>
            <span className="dot-label list">List It</span>
            <span className="dot-label find">Find It</span>
          </div>
          <div className="center-report">
            <button className="report-btn" onClick={() => handleProtectedClick('/report')}>
              Report ➜
            </button>
          </div>
          <div className="tab-buttons">
            <button className="tab pink" onClick={() => handleProtectedClick('/lost-items')}>
              Lost Items
            </button>
            <button className="tab white" onClick={() => handleProtectedClick('/found-items')}>
              Found Items
            </button>
            <button className="tab white" onClick={() => handleProtectedClick('/my-activity')}>
              My Activity
            </button>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section ref={aboutRef} className="about-us-page">
        <div className="about-flow">
          <div className="text-section right">
            <h2>What is Foundly?</h2>
            <p>
              Foundly is a smart and secure lost & found item management system built to reconnect people with their misplaced belongings.
            </p>
            <h2>Why Foundly?</h2>
            <p>
              Losing something shouldn’t feel like the end of the world — and finding something shouldn’t be a dead end.
            </p>
          </div>

          <div className="roadmap-vertical">
            <div className="roadmap-step">
              <img src={signupImg} alt="Sign up" />
              <div className="step-label">Sign up</div>
              <div className="curve-line vertical"></div>
            </div>
            <div className="roadmap-step">
              <img src={listoutImg} alt="List out" />
              <div className="step-label">List out</div>
              <div className="curve-line vertical"></div>
            </div>
            <div className="roadmap-step">
              <img src={notifyImg} alt="Get notified" />
              <div className="step-label">Get notified</div>
            </div>
          </div>

          <div className="features">
            <h2>Key Features</h2>
            <ul>
              <li>📋 Report Items</li>
              <li>👥 Role-Based Access</li>
              <li>🔔 Smart Notifications</li>
              <li>🤝 Claim & Handover</li>
              <li>📊 Dashboard Analytics</li>
              <li>🔍 Filter & Search</li>
            </ul>
          </div>

          <div className="team">
            <h2>Meet the Team</h2>
            <p>
              We are a group of passionate developers and problem-solvers...
            </p>
            <img src={teamImg} alt="Meet the Team" />
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-heading">What users say</h2>
        <Testimonials />
      </section>
    </div>
  );
}

export default HomePage;
