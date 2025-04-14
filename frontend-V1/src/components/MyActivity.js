import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import "../styles/MyActivity.css";

// Define display labels and corresponding enum values
const filters = [
  { label: "Lost Reports", value: "LOST" },
  { label: "Found Reports", value: "FOUND" },
  { label: "Claims", value: "CLAIM" },
  { label: "Handovers", value: "HANDOVER" },
];

const MyActivity = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value); // default to LOST
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.userId) {
      setUserId(user.userId);
    } else {
      console.warn("User object or userId is not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchData(selectedFilter);
  }, [selectedFilter, userId]);

  const fetchData = async (filterValue) => {
    if (!userId) {
      console.warn("User ID not available yet");
      return;
    }

    setLoading(true);
    try {
      let response;

      switch (filterValue) {
        case "LOST":
          response = await axios.get(`http://localhost:8080/api/items/lost/user/${userId}`);
          break;
        case "FOUND":
          response = await axios.get(`http://localhost:8080/api/items/found/user/${userId}`);
          break;
        case "CLAIM":
          response = await axios.get(`http://localhost:8080/api/transactions/claims/${userId}`);
          break;
        case "HANDOVER":
          response = await axios.get(`http://localhost:8080/api/transactions/handovers/${userId}`);
          break;
        default:
          response = { data: [] };
      }

      const typedData = response.data.map((item) => ({
        ...item,
        type: filterValue,
      }));

      setActivityData(typedData);
    } catch (error) {
      console.error(`Error fetching ${filterValue} data:`, error);
      setActivityData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-activity-container">
      <h1 className="activity-heading">My Activity</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button ${selectedFilter === filter.value ? "active" : ""}`}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.label}
            <span className="count-badge">
              {selectedFilter === filter.value ? activityData.length : 0}
            </span>
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="activity-cards-container">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : activityData.length > 0 ? (
          activityData.map((item) => (
            <ActivityCard key={item.id || item.itemId || item.transactionId} item={item} />
          ))
        ) : (
          <p className="no-data">No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default MyActivity;