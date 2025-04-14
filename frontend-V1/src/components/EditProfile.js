import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/EditProfile.css';

function EditProfile() {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [employeeId, setEmployeeId] = useState('');
  const [userId, setUserId] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setUserId(user.id || '');
      setEmployeeId(user.employeeId || '');
      setName(user.name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/${user.id}`, {
        name,
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Update failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Try again later.');
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-box">
        <div className="profile-icon-box">
          <FaUserCircle className="edit-profile-icon" />
          <p className="edit-profile-label">Edit Name</p>
        </div>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID:</label>
            <input type="text" value={userId} disabled />
          </div>

          <div className="form-group">
            <label>Employee ID:</label>
            <input type="text" value={employeeId} disabled />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="save-button">Save Changes</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
