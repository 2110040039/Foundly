import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import '../styles/Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h1>Foundly</h1>
        </Link>
      </div>
      <ul className="navbar-links">
  <li>
    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
      Home
    </Link>
  </li>
  <li>
    <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
      About Us
    </Link>
  </li>
  <li>
    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
      Dashboard
    </Link>
  </li>
</ul>
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <button
            className="navbar-signup-button"
            onClick={() => setShowSignUpForm(true)}
          >
            Sign up
          </button>
          <button
            className="navbar-login-button"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </button>
        </div>
      ) : (
        <button className="navbar-signout-button" onClick={handleSignOut}>
          Sign out
        </button>
      )}
      {showSignUpForm && (
        <SignUpForm
          onClose={() => setShowSignUpForm(false)}
          onSignUp={() => setIsLoggedIn(true)}
        />
      )}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onLogin={() => setIsLoggedIn(true)}
        />
      )}
    </nav>
  );
}

export default Navbar;