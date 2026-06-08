import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ property, amount, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: 'credit'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      if (cleaned.length >= 2) {
        setFormData({ ...formData, [name]: `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` });
      } else {
        setFormData({ ...formData, [name]: cleaned });
      }
      return;
    }
    
    // Format CVV
    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: cleaned });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name is required';
    }
    
    if (cardNumber.length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    
    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = 'Valid expiry date is required';
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onConfirm({ property, amount, ...formData });
    }
  };

  const getCardType = () => {
    const number = formData.cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'Amex';
    return '';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Payment Details</h2>
          <p>Complete your payment for {property?.title}</p>
        </div>

        <div className="payment-summary">
          <div className="summary-row">
            <span>Property</span>
            <span>{property?.title}</span>
          </div>
          <div className="summary-row total">
            <span>Amount Due</span>
            <span className="amount">{amount || property?.price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="payment-type-selector">
            <label className={`payment-type ${formData.cardType === 'credit' ? 'active' : ''}`}>
              <input
                type="radio"
                name="cardType"
                value="credit"
                checked={formData.cardType === 'credit'}
                onChange={handleChange}
              />
              <span className="type-icon">💳</span>
              <span className="type-label">Credit Card</span>
            </label>
            <label className={`payment-type ${formData.cardType === 'debit' ? 'active' : ''}`}>
              <input
                type="radio"
                name="cardType"
                value="debit"
                checked={formData.cardType === 'debit'}
                onChange={handleChange}
              />
              <span className="type-icon">🏦</span>
              <span className="type-label">Debit Card</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name *</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="Name on card"
              className={errors.cardName ? 'error' : ''}
            />
            {errors.cardName && <span className="error-text">{errors.cardName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <div className="card-input-wrapper">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? 'error' : ''}
              />
              {getCardType() && <span className="card-type-badge">{getCardType()}</span>}
            </div>
            {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date *</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className={errors.expiryDate ? 'error' : ''}
              />
              {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV *</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className={errors.cvv ? 'error' : ''}
              />
              {errors.cvv && <span className="error-text">{errors.cvv}</span>}
            </div>
          </div>

          <div className="security-notice">
            <span className="lock-icon">🔒</span>
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-pay">
              Pay {amount || property?.price}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
