import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: '',
    location: '',
    propertyType: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    onFilterChange?.(filters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: '',
      location: '',
      propertyType: ''
    });
    onFilterChange?.({ priceRange: '', location: '', propertyType: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Prices</option>
            <option value="0-300000">$0 - $300,000</option>
            <option value="300000-500000">$300,000 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Enter city or state"
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
          </select>
        </div>

        <button className="filter-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
