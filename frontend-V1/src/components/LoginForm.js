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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPayload = {
      email: formData.usernameOrEmail, // Backend expects email
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('User logged in:', user);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          onLogin(user); // Pass logged-in user back to parent
          onClose();
        }, 3000);
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred during login.');
    }
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
