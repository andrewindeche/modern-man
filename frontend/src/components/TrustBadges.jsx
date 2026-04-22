import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faExchangeAlt, faLock, faHeadset } from '@fortawesome/free-solid-svg-icons';

const TrustBadges = () => (
  <section className="trust-badges">
    <div className="trust-badge">
      <FontAwesomeIcon icon={faShippingFast} className="trust-icon" />
      <div className="trust-text">
        <h4>Free Shipping</h4>
        <p>On orders over KES 5,000</p>
      </div>
    </div>
    <div className="trust-badge">
      <FontAwesomeIcon icon={faExchangeAlt} className="trust-icon" />
      <div className="trust-text">
        <h4>Easy Returns</h4>
        <p>30-day return policy</p>
      </div>
    </div>
    <div className="trust-badge">
      <FontAwesomeIcon icon={faLock} className="trust-icon" />
      <div className="trust-text">
        <h4>Secure Payment</h4>
        <p>100% secure checkout</p>
      </div>
    </div>
    <div className="trust-badge">
      <FontAwesomeIcon icon={faHeadset} className="trust-icon" />
      <div className="trust-text">
        <h4>24/7 Support</h4>
        <p>Dedicated support</p>
      </div>
    </div>
  </section>
);

export default TrustBadges;