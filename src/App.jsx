import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import PropertyGrid from './components/PropertyGrid/PropertyGrid';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import FilterBar from './components/FilterBar/FilterBar';
import Footer from './components/Footer/Footer';
import TourScheduler from './components/TourScheduler';
import ContactAgent from './components/ContactAgent';
import PaymentModal from './components/PaymentModal';
import propertiesData from './data/properties.json';
import './App.css';

// Default agent data
const defaultAgent = {
  name: 'Sarah Johnson',
  title: 'Senior Real Estate Agent',
  email: 'sarah.johnson@realestate.com',
  phone: '(555) 123-4567'
};

const App = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Modal states
  const [showTourScheduler, setShowTourScheduler] = useState(false);
  const [showContactAgent, setShowContactAgent] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Success notification
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...propertiesData];

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => {
        if (max) return p.priceValue >= min && p.priceValue <= max;
        return p.priceValue >= min;
      });
    }

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => 
        p.type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    setProperties(filtered);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleBack = () => {
    setSelectedProperty(null);
  };

  // Tour scheduling handlers
  const handleScheduleTour = () => {
    setShowTourScheduler(true);
  };

  const handleConfirmTour = (tourData) => {
    setShowTourScheduler(false);
    console.log('Tour scheduled:', tourData);
    showNotification(`Tour scheduled for ${tourData.date} at ${tourData.time}! Confirmation sent to ${tourData.email}`);
  };

  // Contact agent handlers
  const handleContactAgent = () => {
    setShowContactAgent(true);
  };

  const handleSendMessage = (messageData) => {
    setShowContactAgent(false);
    console.log('Message sent:', messageData);
    showNotification('Message sent to agent! They will contact you shortly.');
  };

  // Payment handlers
  const handleInitiatePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = (paymentData) => {
    setShowPaymentModal(false);
    console.log('Payment processed:', paymentData);
    showNotification('Payment successful! Confirmation sent to your email.');
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        {selectedProperty ? (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={handleBack}
            onScheduleTour={handleScheduleTour}
            onContactAgent={handleContactAgent}
            onInitiatePayment={handleInitiatePayment}
          />
        ) : (
          <>
            <HeroSection />
            <FilterBar onFilterChange={handleFilterChange} />
            <PropertyGrid properties={properties} onViewDetails={handleViewDetails} />
          </>
        )}
      </main>
      <Footer />
      
      {/* Modals */}
      {showTourScheduler && (
        <TourScheduler
          property={selectedProperty}
          onClose={() => setShowTourScheduler(false)}
          onConfirm={handleConfirmTour}
        />
      )}
      
      {showContactAgent && (
        <ContactAgent
          property={selectedProperty}
          agent={defaultAgent}
          onClose={() => setShowContactAgent(false)}
          onSend={handleSendMessage}
        />
      )}
      
      {showPaymentModal && (
        <PaymentModal
          property={selectedProperty}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentConfirm}
        />
      )}
      
      {/* Notification toast */}
      {notification && (
        <div className="notification-toast">
          <span className="notification-icon">✓</span>
          {notification}
        </div>
      )}
    </div>
  );
};

export default App;
