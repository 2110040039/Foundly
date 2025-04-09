import React, { useState } from 'react';
import '../styles/Form.css';

function SignUpForm({ onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    employeeId: '',
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User registered:', formData);
    setShowMessage(true); // Show success message
    setTimeout(() => {
      setShowMessage(false); // Hide message after 3 seconds
      onSignUp();
      onClose();
    }, 3000);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <p className="welcome-message">Hey user, create a new account!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
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
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            placeholder="Enter your employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        {showMessage && <div className="success-message">New user registered!</div>}
      </div>
    </div>
  );
}

export default SignUpForm;