import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'Instagram', icon: '📷' },
    { name: 'LinkedIn', icon: '💼' },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">LuxuryEstates</span>
          </div>
          <p className="footer-description">
            Your trusted partner in finding the perfect luxury home. We provide 
            exceptional properties in the most desirable locations.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="footer-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📍</span>
              <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>(555) 123-4567</span>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <span>info@luxuryestates.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href="#" 
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} LuxuryEstates. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
