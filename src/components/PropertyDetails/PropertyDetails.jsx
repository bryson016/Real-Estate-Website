import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = ({ property, onBack, onScheduleTour, onContactAgent, onInitiatePayment }) => {
  if (!property) return null;

  const handleContactAgent = () => {
    if (onContactAgent) onContactAgent();
  };

  const handleScheduleTour = () => {
    if (onScheduleTour) onScheduleTour();
  };

  const handlePayment = () => {
    if (onInitiatePayment) onInitiatePayment();
  };

  return (
    <section className="property-details">
      <div className="property-details-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Properties
        </button>
        
        <div className="property-details-content">
          <div className="property-details-image">
            <img src={property.image} alt={property.title} />
            <span className="property-details-badge">For Sale</span>
          </div>
          
          <div className="property-details-info">
            <div className="property-details-price">{property.price}</div>
            <h1 className="property-details-title">{property.title}</h1>
            <p className="property-details-location">
              <span className="location-icon">📍</span>
              {property.location}
            </p>
            
            <div className="property-details-features">
              <div className="detail-feature">
                <span className="detail-icon">🛏️</span>
                <div className="detail-text">
                  <span className="detail-value">{property.bedrooms}</span>
                  <span className="detail-label">Bedrooms</span>
                </div>
              </div>
              <div className="detail-feature">
                <span className="detail-icon">🚿</span>
                <div className="detail-text">
                  <span className="detail-value">{property.bathrooms}</span>
                  <span className="detail-label">Bathrooms</span>
                </div>
              </div>
              <div className="detail-feature">
                <span className="detail-icon">📐</span>
                <div className="detail-text">
                  <span className="detail-value">{property.sqft}</span>
                  <span className="detail-label">Sq Ft</span>
                </div>
              </div>
            </div>
            
            <div className="property-details-description">
              <h3>Description</h3>
              <p>
                Experience luxury living in this stunning {property.title} located in the heart of {property.location}. 
                This beautiful property features {property.bedrooms} bedrooms and {property.bathrooms} bathrooms 
                with approximately {property.sqft} square feet of living space. Perfect for those seeking 
                an elegant and comfortable lifestyle in one of the most coveted locations.
              </p>
            </div>
            
            <div className="property-details-actions">
              <button className="contact-button" onClick={handleContactAgent}>
                Contact Agent
              </button>
              <button className="schedule-button" onClick={handleScheduleTour}>
                Schedule Tour
              </button>
              {onInitiatePayment && (
                <button className="payment-button" onClick={handlePayment}>
                  Make Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
