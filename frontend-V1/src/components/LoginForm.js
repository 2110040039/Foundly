import React, { useState } from 'react';
import '../styles/Form.css';

function LoginForm({ onClose, onLogin }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User logged in:', formData);
    setShowMessage(true); // Show success message
    setTimeout(() => {
      setShowMessage(false); // Hide message after 3 seconds
      onLogin();
      onClose();
    }, 3000);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <p className="welcome-message">Hey, welcome back! We missed you.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            placeholder="Enter your username or email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        {showMessage && <div className="success-message">User logged in!</div>}
      </div>
    </div>
  );
}

export default LoginForm;