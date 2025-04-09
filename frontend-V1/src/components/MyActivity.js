import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Change useHistory to useNavigate
import '../styles/MyActivity.css';

function MyActivity() {
  const history = useNavigate();  // Initialize useNavigate
  const [filterValue, setFilterValue] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Requested');
  
  // Sample activity data
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'LOST ITEM',
      name: 'Wallet',
      status: 'Requested',
      image: null,
      actionStatus: 'Collected'
    },
    {
      id: 2,
      type: 'FOUND ITEM',
      name: 'Umbrella',
      status: 'Requested',
      image: null,
      actionStatus: 'Collected'
    },
    {
      id: 3,
      type: 'LOST ITEM',
      name: 'ID Card',
      status: 'Completed',
      image: null,
      actionStatus: 'Submitted'
    },
    {
      id: 4,
      type: 'FOUND ITEM',
      name: 'Water Bottle',
      status: 'Pending',
      image: null,
      actionStatus: 'Processing'
    }
  ]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleRefresh = () => {
    // In a real app, this would fetch updated data from an API
    alert('Refreshing activity data...');
  };


  // Filter activities based on selected filters
  const filteredActivities = activities.filter(activity => {
    const matchesType = filterValue === 'All' || 
      (filterValue === 'Lost' && activity.type === 'LOST ITEM') || 
      (filterValue === 'Found' && activity.type === 'FOUND ITEM');
    
    const matchesStatus = statusFilter === 'All' || activity.status === statusFilter;
    
    return matchesType && matchesStatus;
  });

  return (
    <div className="activity-page">
      <div className="activity-container">
        <h1 className="activity-title">MY ACTIVITY</h1>
        
        <div className="activity-filters">
          <div className="filter-group">
            <label>Filter by:</label>
            <select 
              value={filterValue} 
              onChange={handleFilterChange}
              className="filter-dropdown"
            >
              <option value="All">All</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={statusFilter} 
              onChange={handleStatusFilterChange}
              className="filter-dropdown"
            >
              <option value="All">All</option>
              <option value="Requested">Requested</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <button onClick={handleRefresh} className="refresh-button">
            ↻
          </button>
        </div>
        
        <div className="activity-list">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="item-header">
                <h2>{activity.type}</h2>
              </div>
              <div className="item-details">
                <div className="item-image">
                  <div className="placeholder-image">X</div>
                </div>
                <div className="item-info">
                  <div className="item-name">Name: {activity.name}</div>
                  <div className={`item-status ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </div>
                </div>
                <div className="item-action">
                  <button className="action-button">{activity.actionStatus}</button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredActivities.length === 0 && (
            <div className="no-activities">
              No activities match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyActivity;