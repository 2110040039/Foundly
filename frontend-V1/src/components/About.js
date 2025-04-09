import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/About.css';

function AboutUs() {
  const [isVisible, setIsVisible] = useState({
    intro: false,
    why: false,
    how: false,
    cta: false
  });

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'header', element: document.getElementById('header-section') },
        { id: 'intro', element: document.getElementById('intro-section') },
        { id: 'why', element: document.getElementById('why-section') },
        { id: 'how', element: document.getElementById('how-section') },
        { id: 'cta', element: document.getElementById('cta-section') }
      ];

      sections.forEach(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [section.id]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-us-container">
      {/* Header Section */}
      <section id="header-section" className={`intro-section ${isVisible.intro ? 'visible' : ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">
              <span className="checkmark">✓</span> FOUNDLY
            </div>
          </div>
          <h2 className="tagline">Helping You Reunite with What Matters Most.</h2>
        </div>
        {/* <div className="hero-illustration">
          <div className="browser-mockup">
            <div className="browser-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="browser-content">
              <div className="alert-icon">
                <div className="icon-inner">!</div>
              </div>
              <div className="line"></div>
              <div className="line shorter"></div>
            </div>
          </div>
        </div> */}
      </section>

      {/* What is Foundly Section */}
      <section 
        id="intro-section" 
        className={`intro-section ${isVisible.intro ? 'visible' : ''}`}
      >
        <div className="section-content">
          <h2 className="section-title">What is Foundly?</h2>
          <p className="section-description">
            Foundly is a smart Lost & Found platform that simplifies the way students and staff
            report, track, and recover items within campus or organizational spaces.
          </p>
        </div>
      </section>

      {/* Why Foundly Section */}
      <section 
        id="why-section" 
        className={`why-section ${isVisible.why ? 'visible' : ''}`}
      >
        <div className="section-content">
          <h2 className="section-title">
            <span className="icon-circle">?</span> Why Foundly?
          </h2>
          <div className="value-cards">
            <div className="value-card">
              <div className="card-icon">
                <span className="icon">🔒</span>
              </div>
              <h3>Secure Reporting</h3>
              <p>Reports are handled with verification to prevent misuse.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <span className="icon">↑</span>
              </div>
              <h3>Fast Recovery</h3>
              <p>Get real-time notifications and reduce delay in item retrieval.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <span className="icon">📈</span>
              </div>
              <h3>Transparent System</h3>
              <p>Track item status at every stage with complete visibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section 
        id="how-section" 
        className={`how-section ${isVisible.how ? 'visible' : ''}`}
      >
        <div className="section-content">
          <h2 className="section-title">
            <span className="icon-circle">↗</span> How it Works
          </h2>
          <div className="workflow">
            <div className="workflow-step">
              <div className="step-icon">✏️</div>
              <h3>Create Account</h3>
              <p>Sign up to start reporting or searching items.</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-icon">↑</div>
              <h3>List Item<br />(Lost or Found)</h3>
              <p>Describe the item, upload a photo, and submit.</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-icon">🔔</div>
              <h3>Get Notified</h3>
              <p>Stay updated when a match or claim request is made.</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-icon">🤝</div>
              <h3>Confirm & Close</h3>
              <p>Collect or handover the item securely. Confirm when done.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        id="cta-section" 
        className={`cta-section ${isVisible.cta ? 'visible' : ''}`}
      >
        <div className="cta-content">
          <h2>Join the community. Help others.<br />Get your lost items back with ease.</h2>
          <button className="cta-button">Create Your Account</button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
