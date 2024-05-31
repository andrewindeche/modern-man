import React from 'react';
import PropTypes from 'prop-types';

const CartSummary = ({ mobileView }) => (
  <div className={`checkout ${mobileView ? '' : 'd-none d-md-block'}`}>
    <div className="checkout-container">
      <div className="checkoutdetails">
        <div className="cartdetails">
          <h4>Cart Summary</h4>
          <span className="checkoutitem">
            <img alt="tuxedo" />
            <p>2 * Black Full Italian Men's Tuxedo</p>
            <p className="amount">$2000</p>
          </span>
          <span className="checkoutitem">
            <img alt="tuxedo" />
            <p>1 * Grey full Official Men's Suit</p>
            <p className="amount">$1500</p>
          </span>
          <span className="checkoutitem">
            <img alt="tuxedo" />
            <p>1 * White full Official Men's Suit</p>
            <p className="amount">$1800</p>
          </span>
        </div>
        <div className="grandtotal">
          <span className="checkoutamount">
            <p>SubTotal</p>
            <p className="amount">$3400</p>
          </span>
          <span className="checkoutamount">
            <p>Shipping</p>
            <p className="amount">$0</p>
          </span>
          <span className="checkoutamount">
            <p>Total</p>
            <p className="amount">$3400</p>
          </span>
          <span className="checkoutamount">
            <button type="button">Place Order</button>
          </span>
        </div>
      </div>
    </div>
  </div>
);

CartSummary.propTypes = {
  mobileView: PropTypes.bool,
};

CartSummary.defaultProps = {
  mobileView: false,
};

export default CartSummary;
