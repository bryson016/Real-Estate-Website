import React, { useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    price: '',
    propertyType: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Find Your <span className="hero-highlight">Dream Home</span>
        </h1>
        <p className="hero-subtitle">
          Discover luxury properties in the most desirable locations
        </p>

        <form className="hero-search" onSubmit={handleSearch}>
          <div className="search-input-group">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={searchData.location}
              onChange={handleInputChange}
              className="search-input"
            />
          </div>
          
          <div className="search-input-group">
            <select
              name="price"
              value={searchData.price}
              onChange={handleInputChange}
              className="search-input"
            >
              <option value="">Price Range</option>
              <option value="0-300000">$0 - $300,000</option>
              <option value="300000-500000">$300,000 - $500,000</option>
              <option value="500000-1000000">$500,000 - $1,000,000</option>
              <option value="1000000+">$1,000,000+</option>
            </select>
          </div>
          
          <div className="search-input-group">
            <select
              name="propertyType"
              value={searchData.propertyType}
              onChange={handleInputChange}
              className="search-input"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
