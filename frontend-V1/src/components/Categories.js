import React from 'react';
import '../styles/HomePage.css';

function Categories() {
  const categories = [
    'Phone',
    'Wallet',
    'Watch',
    'Bags',
    'Electronics',
    'Documents',
    'Keys',
    'Fashion accessories',
    'Jewellery',
    'Others',
  ];

  return (
    <div className="categories-section">
      <h2>Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;