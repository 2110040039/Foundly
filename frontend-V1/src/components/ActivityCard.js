import React from 'react';
import "../styles/MyActivity.css";

const ActivityCard = ({ item }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Found': return 'status-missing';
      case 'With Security': return 'status-security';
      case 'Received': return 'status-received';
      case 'Requested': return 'status-pending';
      default: return 'status-missing';
    }
  };

  const getBorderClass = (type) => {
    switch (type) {
      case 'LOST': return 'border-lost';
      case 'FOUND': return 'border-found';
      case 'CLAIM': return 'border-claim';
      case 'HANDOVER': return 'border-handover';
      default: return '';
    }
  };

  return (
    <div className={`flip-card ${getBorderClass(item.itemType)}`}>
      <div className="flip-inner">
        {/* Front Side */}
        <div className="flip-front">
          <div className="image-container">
            <img
              src={item.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={item.itemName}
            />
            <div className={`status-tag ${getStatusClass(item.transactionStatus)}`}>
              {item.transactionStatus}
            </div>
          </div>
          <div className="card-info">
            <div className="card-title">{item.itemName}</div>
            <div className="card-subinfo">{item.location}</div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-back">
          <div className="back-heading">{item.itemName}</div>
          <div className="info-row"><span>Category:</span> {item.category}</div>
          <div className="info-row"><span>Date:</span> {item.dateReported}</div>

          <div className="description">
            <span>Description:</span>
            <p>{item.description}</p>
          </div>

          {item.securityName && item.securityId && (
            <div className="info-row">
              <span>Security:</span> {item.securityName} ({item.securityId})
            </div>
          )}

          {item.pickupMessage && (
            <div className="info-row">
              <span>Pickup Message:</span> {item.pickupMessage}
            </div>
          )}

          <button className="handover-btn">Collected</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
