
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../styles/Navbar.css';
// import { FaUserCircle } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';

// function Navbar({ onAboutClick, activeSection }) {
//   const { isLoggedIn, setShowAuthBox, handleLogout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleEditProfile = () => {
//     navigate('/edit-profile');
//     setShowDropdown(false);
//   };

//   const onLogoutClick = () => {
//     handleLogout();
//     setShowDropdown(false);
//   };

//   const handleAboutClick = () => {
//     if (location.pathname === '/') {
//       onAboutClick?.(); // Scroll directly if already on home
//     } else {
//       navigate('/', { state: { scrollToAbout: true } }); // Navigate to home and scroll there
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <h1 onClick={() => navigate('/')} className="nav-link no-underline">
//           Foundly
//         </h1>
//       </div>

//       <ul className="navbar-links">
//         <li className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>
//           <button className="nav-link button-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//             Home
//           </button>
//         </li>
//         <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
//           <button className="nav-link button-link" onClick={() => navigate('/dashboard')}>
//             Dashboard
//           </button>
//         </li>
//         <li className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>
//           <button className="nav-link button-link" onClick={handleAboutClick}>
//             About Us
//           </button>
//         </li>
//       </ul>

//       <div className="auth-button-container">
//         {isLoggedIn ? (
//           <div className="profile-container">
//             <FaUserCircle
//               className="profile-icon"
//               title="My Profile"
//               onClick={() => setShowDropdown(prev => !prev)}
//             />
//             {showDropdown && (
//               <div className="profile-dropdown">
//                 <div className="dropdown-item" onClick={handleEditProfile}>Edit Profile</div>
//                 <div className="dropdown-item" onClick={onLogoutClick}>Logout</div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button className="navbar-auth-button" onClick={() => setShowAuthBox(true)}>
//             Sign In / Sign Up
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navbar({ onAboutClick, activeSection }) {
  const { isLoggedIn, setShowAuthBox, handleLogout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEditProfile = () => {
    navigate('/edit-profile');
    setShowDropdown(false);
  };

  const onLogoutClick = () => {
    handleLogout();
    setShowDropdown(false);
  };

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      onAboutClick?.(); // Scroll if already on home
    } else {
      navigate('/', { state: { scrollToAbout: true } }); // Navigate and scroll later
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 onClick={() => navigate('/')} className="nav-link no-underline">
          Foundly
        </h1>
      </div>

      <ul className="navbar-links">
        <li className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>
          <button className="nav-link button-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Home
          </button>
        </li>
        <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <button className="nav-link button-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        </li>
        <li className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>
          <button className="nav-link button-link" onClick={handleAboutClick}>
            About Us
          </button>
        </li>
      </ul>

      <div className="auth-button-container">
        {isLoggedIn ? (
          <div className="profile-container">
            <FaUserCircle
              className="profile-icon"
              title="My Profile"
              onClick={() => setShowDropdown(prev => !prev)}
            />
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={handleEditProfile}>Edit Profile</div>
                <div className="dropdown-item" onClick={onLogoutClick}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="navbar-auth-button" onClick={() => setShowAuthBox(true)}>
            Sign In / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

