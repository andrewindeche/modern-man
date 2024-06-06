import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CartSummary = ({ mobileView }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`checkout ${mobileView ? '' : 'd-none d-md-block'}`}>
      <div className="checkout-container">
        <div className="checkoutdetails">
          <div className="cartdetails">
            <h4>Cart Summary</h4>
            {cartItems.map((item, index) => (
              <span key={index} className="checkoutitem">
                <img src={item.image} alt={item.name} />
                <p>
                  {item.quantity}
                  {' '}
                  *
                  {' '}
                  {item.name}
                </p>
                <p className="amount">
                  $
                  {item.price * item.quantity}
                </p>
              </span>
            ))}
          </div>
          <div className="grandtotal">
            <span className="checkoutamount">
              <p>SubTotal</p>
              <p className="amount">{subtotal}</p>
            </span>
            <span className="checkoutamount">
              <p>Shipping</p>
              <p className="amount">$0</p>
            </span>
            <span className="checkoutamount">
              <p>Total</p>
              <p className="amount">{subtotal}</p>
            </span>
            <span className="checkoutamount">
              <button type="button">Place Order</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  // eslint-disable-next-line react/require-default-props
  mobileView: PropTypes.bool,
};

export default CartSummary;
