import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyGrid.css';

const PropertyGrid = ({ properties, onViewDetails }) => {
  return (
    <section className="property-grid-section" id="properties">
      <div className="property-grid-container">
        <div className="property-grid-header">
          <h2 className="property-grid-title">Featured Properties</h2>
          <p className="property-grid-subtitle">
            Explore our curated selection of luxury homes
          </p>
        </div>
        
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
