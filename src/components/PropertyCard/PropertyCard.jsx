import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onViewDetails }) => {
  const {
    image,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    sqft
  } = property;

  const handleViewClick = () => {
    if (onViewDetails) {
      onViewDetails(property);
    }
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={image} alt={title} />
        <span className="property-badge">For Sale</span>
      </div>
      
      <div className="property-content">
        <div className="property-price">{price}</div>
        <h3 className="property-title">{title}</h3>
        <p className="property-location">
          <span className="location-icon">📍</span>
          {location}
        </p>
        
        <div className="property-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span>{bedrooms} Beds</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚿</span>
            <span>{bathrooms} Baths</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📐</span>
            <span>{sqft} sqft</span>
          </div>
        </div>
        
<button className="property-button" onClick={handleViewClick}>View Details</button>
      </div>
    </div>
  );
};

export default PropertyCard;
