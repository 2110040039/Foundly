import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

function SignUpForm({ onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      employeeId: formData.employeeId,
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      phone: '9999999999' // Placeholder phone number since it's not taken from form
    };

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', userData);
      console.log('User registered:', response.data);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        onSignUp();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <p className="welcome-message">Hey user, create a new account!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="employeeId"
            placeholder="Enter your employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>

        {showMessage && <div className="success-message">New user registered!</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SignUpForm;
