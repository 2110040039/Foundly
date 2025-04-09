import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import '../styles/Dashboard.css';
import { AlertCircle, CheckCircle, Database, Shield } from 'lucide-react';

const Dashboard = () => {
  // Sample data for stats
  const stats = [
    { 
      id: 1, 
      title: 'Total Lost Items Reported', 
      count: 38, 
      icon: <AlertCircle className="stat-icon lost-icon" />,
      change: '+8% this week',
      type: 'lost'
    },
    { 
      id: 2, 
      title: 'Total Found Itemss Reported', 
      count: 26, 
      icon: <CheckCircle className="stat-icon found-icon" />,
      change: '+12% this week',
      type: 'found'
    },
    { 
      id: 3, 
      title: 'Items Successfully Returned', 
      count: 19, 
      icon: <Database className="stat-icon neutral-icon" />,
      change: '',
      type: 'neutral'
    }
  ];

  // Sample data for monthly trends
  const monthlyData = [
    { name: 'Jan', lost: 14, found: 6 },
    { name: 'Feb', lost: 23, found: 12 },
    { name: 'Mar', lost: 13, found: 20 },
    { name: 'Apr', lost: 15, found: 30 },
    { name: 'Jun', lost: 13, found: 33 },
  ];

  // Sample data for item categories
  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'ID Cards', value: 30 },
    { name: 'Wallets', value: 25 },
  ];

  // Sample data for claim status
  const claimStatusData = [
    { name: 'Requested', value: 35 },
    { name: 'Pending', value: 24 },
    { name: 'Completed', value: 25 },
    { name: 'Handed Over', value: 16 },
  ];

  // Sample data for locations
  const locationData = [
    { name: 'Library', value: 18 },
    { name: 'Cafeteria', value: 25 },
    { name: 'Gym', value: 20 },
    { name: 'Lecture Hall', value: 28 },
  ];

  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'You have 2 pending claims to review', time: '21' },
    { id: 2, message: 'New claim submitted for your item', time: '2h ago' },
    { id: 3, message: 'Item handed over to owner', time: '1d' },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#FF8042', '#82ca9d', '#8884d8'];
  const LOST_COLOR = '#ff6b6b';
  const FOUND_COLOR = '#69db7c';

  // Render stat cards
  const renderStatCards = () => {
    return stats.map(stat => (
      <div key={stat.id} className={`stat-card ${stat.type}-card`}>
        <div className="stat-icon-container">
          {stat.icon}
        </div>
        <div className="stat-content">
          <h2 className="stat-count">{stat.count}</h2>
          <p className="stat-title">{stat.title}</p>
          {stat.change && <p className="stat-change">{stat.change}</p>}
        </div>
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      {/* Key Statistics Section */}
      <div className="stats-container">
        {renderStatCards()}
        <div className="stat-card security-card">
          <div className="security-content">
            <Shield className="shield-icon" />
            <h2>Backed by Security Team</h2>
            <p>30 Verified handovers</p>
          </div>
        </div>
      </div>

      {/* Analytics Section - Charts */}
      <div className="charts-container">
        {/* Monthly Trends Chart */}
        <div className="chart-card">
          <h3>Monthly Activity Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="lost" 
                stroke={LOST_COLOR} 
                activeDot={{ r: 8 }} 
                name="Lost Items" 
              />
              <Line 
                type="monotone" 
                dataKey="found" 
                stroke={FOUND_COLOR} 
                name="Found Items" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Item Categories Chart */}
        <div className="chart-card">
          <h3>Item Categories Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Locations Chart */}
        <div className="chart-card">
          <h3>Top Locations with Most Reports</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4dabf7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Status Chart */}
        <div className="chart-card">
          <h3>Claim Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={claimStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4dabf7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="notifications-panel">
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button className="settings-button">···</button>
        </div>
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;