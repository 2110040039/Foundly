
// import React, { useState } from 'react';
// import '../styles/AuthBox.css';

// function AuthBox({ isOpen, onClose, onAuthSuccess }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     employeeId: '',
//     email: '',
//     password: ''
//   });

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8080/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password
//         })
//       });

//       if (response.ok) {
//         const user = await response.json();
//         onAuthSuccess(user); // Trigger parent handler
//         onClose(); // Close modal
//       } else {
//         alert('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed');
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/users/register", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: formData.name,
//           employeeId: formData.employeeId,
//           email: formData.email,
//           password: formData.password
//         })
//       });

//       if (response.ok) {
//         const user = await response.json();
//         onAuthSuccess(user);
//         onClose();
//       } else {
//         const errorText = await response.text();
//         alert(`Registration failed: ${errorText}`);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Error during registration.');
//     }
//   };

//   return (
//     <div className="authbox-overlay">
//       <div className={`authbox-container ${!isLogin ? 'active' : ''}`}>
//         <button className="close-btn" onClick={onClose}>&times;</button>

//         {/* Login Form */}
//         <div className={`form-box login ${isLogin ? 'show' : ''}`}>
//           <form onSubmit={handleLogin}>
//             <h1>Sign In</h1>
//             <div className="input-box">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="forgot-link">
//               <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit" className="btn login-btn">Login</button>
//           </form>
//         </div>

//         {/* Register Form */}
//         <div className={`form-box register ${!isLogin ? 'show' : ''}`}>
//           <form onSubmit={handleRegister}>
//             <h1>Create Account</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-box">
//               <input
//                 type="text"
//                 name="employeeId"
//                 placeholder="Employee ID"
//                 value={formData.employeeId}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-box">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn register-btn">Register</button>
//           </form>
//         </div>

//         {/* Toggle Side Panel */}
//         <div className="toggle-box">
//           <div className={`toggle-panel ${isLogin ? 'toggle-left' : 'toggle-right'}`}>
//             {isLogin ? (
//               <>
//                 <h1>Hello, Friend!</h1>
//                 <p>Don’t have an account? Register here</p>
//                 <button className="btn" onClick={() => setIsLogin(false)}>Register</button>
//               </>
//             ) : (
//               <>
//                 <h1>Welcome Back!</h1>
//                 <p>Already have an account? Sign in here</p>
//                 <button className="btn" onClick={() => setIsLogin(true)}>Sign In</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthBox;
import React, { useState } from 'react';
import '../styles/AuthBox.css';

function AuthBox({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const saveUserToLocalStorage = (user) => {
    if (user?.id) {
      localStorage.setItem("userId", user.id.toString()); // ✅ store as string
    } else {
      console.warn("User ID not found in response");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const user = await response.json();
        saveUserToLocalStorage(user);
        onAuthSuccess(user);
        onClose();
      } else {
        const errorMsg = await response.text();
        alert(`Login failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again later.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          employeeId: formData.employeeId,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const user = await response.json();
        saveUserToLocalStorage(user);
        onAuthSuccess(user);
        onClose();
      } else {
        const errorMsg = await response.text();
        alert(`Registration failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error during registration. Please try again later.');
    }
  };

  return (
    <div className="authbox-overlay">
      <div className={`authbox-container ${!isLogin ? 'active' : ''}`}>
        <button className="close-btn" onClick={onClose}>&times;</button>

        {/* Login Form */}
        <div className={`form-box login ${isLogin ? 'show' : ''}`}>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn login-btn">Login</button>
          </form>
        </div>

        {/* Register Form */}
        <div className={`form-box register ${!isLogin ? 'show' : ''}`}>
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn register-btn">Register</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-box">
          <div className={`toggle-panel ${isLogin ? 'toggle-left' : 'toggle-right'}`}>
            {isLogin ? (
              <>
                <h1>Hello, Friend!</h1>
                <p>Don’t have an account? Register here</p>
                <button className="btn" onClick={() => setIsLogin(false)}>Register</button>
              </>
            ) : (
              <>
                <h1>Welcome Back!</h1>
                <p>Already have an account? Sign in here</p>
                <button className="btn" onClick={() => setIsLogin(true)}>Sign In</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBox;

