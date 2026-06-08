import React, { useState } from 'react';
import './ContactAgent.css';

const ContactAgent = ({ property, agent, onClose, onSend }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in ${property?.title}. Please contact me with more information.`
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ property, agent, ...formData });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-agent" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="agent-info">
            <div className="agent-avatar">
              {agent?.name?.charAt(0) || 'A'}
            </div>
            <div className="agent-details">
              <h2>{agent?.name || 'Agent'}</h2>
              <p>{agent?.title || 'Real Estate Agent'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="contact-methods">
            <div className="contact-method">
              <span className="method-icon">📧</span>
              <div className="method-info">
                <span className="method-label">Email</span>
                <span className="method-value">{agent?.email || 'agent@realestate.com'}</span>
              </div>
            </div>
            <div className="contact-method">
              <span className="method-icon">📞</span>
              <div className="method-info">
                <span className="method-label">Phone</span>
                <span className="method-value">{agent?.phone || '(555) 123-4567'}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-send">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactAgent;
