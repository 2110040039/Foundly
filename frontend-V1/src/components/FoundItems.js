// FoundItems.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FoundItems.css';

function FoundItems() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    location: 'All',
    dateRange: 'All',
    category: 'All'
  });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample found items data
  const foundItems = [
    {
      id: 1,
      name: 'Blue Wallet',
      image: null,
      category: 'Wallet',
      location: 'Building A',
      date: '2025-04-09',
      time: '10:30',
      status: 'Pending',
      description: 'Blue leather wallet found near entrance',
      handling: 'keep',
      finderMessage: 'Contact me at 555-1234, available after 2 PM'
    },
    {
      id: 2,
      name: 'Silver Keys',
      image: null,
      category: 'Keys',
      location: 'Cafeteria',
      date: '2025-04-08',
      time: '15:00',
      status: 'Requested',
      description: 'Set of keys with a car key fob',
      handling: 'security',
      securityInfo: { id: 'SEC001', name: 'John Doe', location: 'Main Security Office' }
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

    foundItems.forEach(item => {
      const itemDate = new Date(item.date);
      const diffDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) groups.Today.push(item);
      else if (diffDays <= 7) groups['This Week'].push(item);
      else if (diffDays <= 30) groups['This Month'].push(item);
      else groups.Earlier.push(item);
    });

    return groups;
  };

  const filteredItems = foundItems.filter(item => {
    return (
      (filters.status === 'All' || item.status === filters.status) &&
      (filters.location === 'All' || item.location === filters.location) &&
      (filters.category === 'All' || item.category === filters.category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const groupedItems = groupItemsByTime();

  const handleClaimClick = (item) => {
    setSelectedItem(item);
    setShowClaimModal(true);
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setShowClaimModal(false);
    // Simulate claim processing
    setTimeout(() => {
      navigate('/my-activity');
    }, 2000);
  };

  return (
    <div className="found-items-page">
      <div className="found-items-container">
        <h1 className="found-items-title">FOUND ITEMS</h1>

        <div className="search-filter-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Found Items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-controls">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Requested">Requested</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="All">All Locations</option>
              <option value="Building A">Building A</option>
              <option value="Cafeteria">Cafeteria</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="All">All Categories</option>
              <option value="Wallet">Wallet</option>
              <option value="Keys">Keys</option>
            </select>
          </div>
        </div>

        <div className="items-list">
          {Object.entries(groupedItems).map(([group, items]) => (
            items.length > 0 && (
              <div key={group} className="time-group">
                <h2>{group}</h2>
                <div className="items-grid">
                  {items.map(item => (
                    <div key={item.id} className="found-item-card">
                      <div className="card-front">
                        <div className="item-image">{item.image || '📷'}</div>
                        <h3>{item.name}</h3>
                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                        <button
                          className="claim-button"
                          onClick={() => handleClaimClick(item)}
                        >
                          Claim
                        </button>
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

        {showClaimModal && selectedItem && (
          <div className="claim-modal">
            <div className="modal-content">
              <h2>Claim Item</h2>
              <form onSubmit={handleClaimSubmit}>
                <label>
                  Employee ID:
                  <input type="text" required />
                </label>
                <label>
                  Employee Name:
                  <input type="text" required />
                </label>
                <label>
                  Proof of Ownership:
                  <input type="file" accept="image/*,application/pdf" required />
                </label>
                <div className="modal-buttons">
                  <button type="button" className="cancel-button" onClick={() => setShowClaimModal(false)}>
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

export default FoundItems;