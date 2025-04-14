// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showAuthBox, setShowAuthBox] = useState(false);

//   const handleAuthSuccess = () => {
//     setIsLoggedIn(true);
//     setShowAuthBox(false);
//   };

//   return (
//     <AuthContext.Provider value={{
//       isLoggedIn,
//       setIsLoggedIn,
//       showAuthBox,
//       setShowAuthBox,
//       handleAuthSuccess,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );
  const [showAuthBox, setShowAuthBox] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleAuthSuccess = (user) => {
    setIsLoggedIn(true);
    setShowAuthBox(false);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user)); // optional: store user info
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuthBox(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      showAuthBox,
      setShowAuthBox,
      handleAuthSuccess,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};


