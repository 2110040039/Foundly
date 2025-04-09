// LostItems.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LostItems.css';

function LostItems() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    location: 'All',
    dateRange: 'All',
    category: 'All'
  });
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAuthenticated] = useState(true); // Assume authenticated for demo

  // Sample lost items data
  const lostItems = [
    {
      id: 1,
      name: 'Black Wallet',
      image: null,
      category: 'Wallet',
      location: 'Building B',
      date: '2025-04-09',
      time: '09:15',
      status: 'Pending',
      description: 'Lost near the main entrance'
    },
    {
      id: 2,
      name: 'Car Keys',
      image: null,
      category: 'Keys',
      location: 'Parking Lot',
      date: '2025-04-07',
      time: '14:30',
      status: 'Requested',
      description: 'Set of keys with a blue keychain'
    }
  ];

  const groupItemsByTime = () => {
    const today = new Date('2025-04-09');
    const groups = {
      Today: [],
      'This Week': [],
      'This Month': [],
      Earlier: []
    };

    lostItems.forEach(item => {
      const itemDate = new Date(item.date);
      const diffDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) groups.Today.push(item);
      else if (diffDays <= 7) groups['This Week'].push(item);
      else if (diffDays <= 30) groups['This Month'].push(item);
      else groups.Earlier.push(item);
    });

    return groups;
  };

  const filteredItems = lostItems.filter(item => {
    return (
      (filters.status === 'All' || item.status === filters.status) &&
      (filters.location === 'All' || item.location === filters.location) &&
      (filters.category === 'All' || item.category === filters.category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const groupedItems = groupItemsByTime();

  const handleHandoverClick = (item) => {
    setSelectedItem(item);
    setShowHandoverModal(true);
  };

  const handleHandoverSubmit = (e) => {
    e.preventDefault();
    // Simulate POST request to backend
    console.log('Handover data submitted:', { selectedItem, formData: e.target });
    setShowHandoverModal(false);
    setTimeout(() => {
      navigate('/my-activity');
    }, 1000);
  };

  return (
    <div className="lost-items-page">
      <div className="lost-items-container">
        <h1 className="lost-items-title">LOST ITEMS</h1>

        <div className="search-filter-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Lost Items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-controls">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              title="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Requested">Requested</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              title="Filter by location"
            >
              <option value="All">All Locations</option>
              <option value="Building B">Building B</option>
              <option value="Parking Lot">Parking Lot</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              title="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Wallet">Wallet</option>
              <option value="Keys">Keys</option>
            </select>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">🕵️‍♂️</div>
            <p>No lost items found matching your criteria.</p>
          </div>
        ) : (
          <div className="items-list">
            {Object.entries(groupedItems).map(([group, items]) => (
              items.length > 0 && (
                <div key={group} className="time-group">
                  <h2>{group}</h2>
                  <div className="items-grid">
                    {items.map(item => (
                      <div key={item.id} className="lost-item-card">
                        <div className="card-front">
                          <div className="item-image">{item.image || '📷'}</div>
                          <h3>{item.name}</h3>
                          <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                          {isAuthenticated && (
                            <button
                              className="handover-button"
                              onClick={() => handleHandoverClick(item)}
                            >
                              Handover
                            </button>
                          )}
                        </div>
                        <div className="card-back">
                          <h3>{item.name}</h3>
                          <div className="item-details">
                            <div className="detail-labels">
                              <span>Category:</span>
                              <span>Location:</span>
                              <span>Date:</span>
                              <span>Time:</span>
                              <span>Status:</span>
                            </div>
                            <div className="detail-values">
                              <span>{item.category}</span>
                              <span>{item.location}</span>
                              <span>{item.date}</span>
                              <span>{item.time}</span>
                              <span>{item.status}</span>
                            </div>
                          </div>
                          <div className="description">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {showHandoverModal && selectedItem && (
          <div className="handover-modal">
            <div className="modal-content">
              <h2>Handover Lost Item</h2>
              <form onSubmit={handleHandoverSubmit}>
                <label>
                  Employee ID:
                  <input type="text" required />
                </label>
                <label>
                  Employee Name:
                  <input type="text" required />
                </label>
                <label>
                  Where it was found:
                  <textarea required placeholder="Enter location details" />
                </label>
                <label>
                  When it was found:
                  <input type="datetime-local" required />
                </label>
                <label>
                  Upload Photo:
                  <input type="file" accept="image/*" required />
                </label>
                <div className="handling-options">
                  <label>
                    <input type="radio" name="handling" value="keep" required />
                    Keep it with Me
                  </label>
                  <textarea
                    placeholder="Pickup Message/Instructions"
                    className="handling-input"
                  />
                  <label>
                    <input type="radio" name="handling" value="security" />
                    Handover to Security
                  </label>
                  <input
                    type="text"
                    placeholder="Security ID"
                    className="handling-input"
                  />
                </div>
                <div className="modal-buttons">
                  <button type="button" className="cancel-button" onClick={() => setShowHandoverModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LostItems;