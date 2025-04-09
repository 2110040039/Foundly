import React, { useState } from 'react';
import '../styles/ReportItem.css';

function ReportItem() {
  const [activeTab, setActiveTab] = useState('found'); // Changed default to "Found"
  const [itemHandling, setItemHandling] = useState('');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset item handling when switching tabs
    if (tab === 'lost') {
      setItemHandling('');
    }
  };

  const handleItemHandlingChange = (e) => {
    setItemHandling(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${activeTab} item reported`);
    console.log(`Item handling: ${itemHandling}`);
  };

  return (
    <div className="report-item-container">
      <div className="tabs">
        <button
          className={`tab lost ${activeTab === 'lost' ? 'active' : ''}`}
          onClick={() => handleTabChange('lost')}
        >
          Lost
        </button>
        <button
          className={`tab found ${activeTab === 'found' ? 'active' : ''}`}
          onClick={() => handleTabChange('found')}
        >
          Found
        </button>
      </div>
      <form className="report-form" onSubmit={handleSubmit}>
        <h2>{activeTab === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}</h2>
        <label>
          Enter item name:
          <input type="text" placeholder="Enter item name" required />
        </label>
        <label>
          Select category:
          <select required>
            <option value="">Select category</option>
            <option value="phone">Phone</option>
            <option value="wallet">Wallet</option>
            <option value="watch">Watch</option>
            <option value="bags">Bags</option>
            <option value="electronics">Electronics</option>
            <option value="documents">Documents</option>
            <option value="keys">Keys</option>
            <option value="fashion">Fashion accessories</option>
            <option value="jewellery">Jewellery</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Enter description:
          <textarea placeholder="Enter description" required></textarea>
        </label>
        <label>
          Select location:
          <select required>
            <option value="">Select location</option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
          </select>
        </label>
        <label>
          Select date:
          <input type="date" required />
        </label>
        <label>
          Select time:
          <input type="time" required />
        </label>
        <label>
          Enter mobile number:
          <input type="tel" placeholder="Enter mobile number" required />
        </label>
        <label>
          Enter email ID:
          <input type="email" placeholder="Enter email ID" required />
        </label>
        
        {/* New fields for Found Items */}
        {activeTab === 'found' && (
          <div className="item-handling-options">
            <p>What would you like to do with the found item?</p>
            <div className="radio-option">
              <input 
                type="radio" 
                id="keep-with-me" 
                name="itemHandling" 
                value="keep" 
                checked={itemHandling === 'keep'}
                onChange={handleItemHandlingChange}
              />
              <label htmlFor="keep-with-me">Keep it with me</label>
            </div>
            
            {itemHandling === 'keep' && (
              <div className="message-box">
                <textarea 
                  placeholder="Please provide details on how someone can contact you to retrieve the item"
                  className="handling-message"
                ></textarea>
              </div>
            )}
            
            <div className="radio-option">
              <input 
                type="radio" 
                id="handover-security" 
                name="itemHandling" 
                value="security" 
                checked={itemHandling === 'security'}
                onChange={handleItemHandlingChange}
              />
              <label htmlFor="handover-security">Handover to security</label>
            </div>
            
            {itemHandling === 'security' && (
              <div className="message-box">
                <textarea 
                  placeholder="Please provide details about which security office the item was handed to"
                  className="handling-message"
                ></textarea>
              </div>
            )}
          </div>
        )}
        
        <label className="upload-media">
          <span>Upload media:</span>
          <input type="file" />
        </label>
        <div className="form-buttons">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportItem;