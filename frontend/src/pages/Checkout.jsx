import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShoppingBag, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { initiateMpesaPayment } from '../store/mpesaSlice';
import { setSelectedOption } from '../store/paymentSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const selectedOption = useSelector((state) => state.payment.selectedOption);
  const { loading: mpesaLoading, success: mpesaSuccess } = useSelector((state) => state.mpesa);
  const [phone, setPhone] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleOptionChange = (option) => {
    dispatch(setSelectedOption(option));
  };

  const handleMpesaSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    dispatch(initiateMpesaPayment({ phone_number: phone, amount: total }))
      .finally(() => setProcessing(false));
  };

  const subtotal = total;
  const shipping = subtotal >= 5000 ? 0 : 500;
  const grandTotal = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-page">
        <FontAwesomeIcon icon={faShoppingBag} className="empty-cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Add some items to get started</p>
        <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h2 className="checkout-title">Checkout</h2>
          
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            
            <div className="payment-options-grid">
              <button
                type="button"
                className={`payment-option ${selectedOption === 'mpesa' ? 'selected' : ''}`}
                onClick={() => handleOptionChange('mpesa')}
              >
                <img src={MpesaImage} alt="M-Pesa" />
                <span>M-Pesa</span>
                {selectedOption === 'mpesa' && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
              </button>
              
              <button
                type="button"
                className={`payment-option ${selectedOption === 'card' ? 'selected' : ''}`}
                onClick={() => handleOptionChange('card')}
              >
                <FontAwesomeIcon icon={faMoneyBillWave} className="payment-icon" />
                <span>Card</span>
                {selectedOption === 'card' && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
              </button>
            </div>
          </div>

          {selectedOption === 'mpesa' && (
            <form className="payment-form" onSubmit={handleMpesaSubmit}>
              <div className="form-group">
                <label>Enter M-Pesa Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 254712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="form-hint">Enter the phone number registered with M-Pesa</p>
              </div>
              <button type="submit" className="pay-btn" disabled={processing || !phone}>
                {processing ? 'Processing...' : `Pay KES ${grandTotal.toLocaleString()}`}
              </button>
            </form>
          )}

          {selectedOption === 'card' && (
            <form className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <button type="submit" className="pay-btn">
                Pay KES {grandTotal.toLocaleString()}
              </button>
            </form>
          )}

          {!selectedOption && (
            <div className="select-payment-prompt">
              <p>Please select a payment method to continue</p>
            </div>
          )}
        </div>

        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <span>KES {item.discounted_price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `KES ${shipping}`}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>KES {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;