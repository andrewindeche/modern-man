import React, { useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import {
  Elements, CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import CartSummary from '../components/CartSummary';
import MpesaImage from '../images/mpesa.webp';
import VisaImage from '../images/visa.webp';
import MastercardImage from '../images/mastercard.webp';
import { fetchStripePublicKey } from '../store/stripeSlice';
import { setSelectedOption, processPayment } from '../store/paymentSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const stripePublicKey = useSelector((state) => state.stripe.publicKey);
  const stripeStatus = useSelector((state) => state.stripe.status);
  const selectedOption = useSelector((state) => state.payment.selectedOption);
  const paymentStatus = useSelector((state) => state.payment.status);
  const paymentError = useSelector((state) => state.payment.error);

  useEffect(() => {
    if (stripeStatus === 'idle') {
      dispatch(fetchStripePublicKey());
    }
  }, [stripeStatus, dispatch]);

  const handleOptionChange = (event) => {
    dispatch(setSelectedOption(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(processPayment({ stripe, elements, selectedOption }));
  };

  if (stripeStatus === 'loading' || !stripePublicKey) {
    return <div>Loading...</div>;
  }

  const stripePromise = loadStripe(stripePublicKey);
  //const stripe = useStripe();
  //const elements = useElements();

  return (
    <>
      <NotificationBar />
      <SearchBar />
      <NavButtons />
      <Tab.Container defaultActiveKey="Billing Details">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="Billing Details">Billing Detail</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Payment Options">Payment Options</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="Billing Details">
            <form className="billingdetails">
              <label className="locationHeading">Personal Details</label>
              <label>First and Last Name:</label>
              <input placeholder="Enter Your First and Last Name" />
              <label>Email Address:</label>
              <input placeholder="Enter Your Email Address" />
              <label className="locationHeading">Delivery Details</label>
              <span className="locationAddress">
                <label>Location:</label>
                <input placeholder="Enter Your Delivery Location" />
                <label>Building:</label>
                <input placeholder="Enter Your Building Details" />
              </span>
              <span className="checkoutamount"><button>Save</button></span>
            </form>
          </Tab.Pane>
          <Tab.Pane eventKey="Payment Options">
            <div className="payment-options">
              <p>Select Your Preferred payment method.</p>
              <form onSubmit={handleSubmit}>
                <div className="radio">
                    <label>
                      <p>CREDIT CARD</p>
                      <input
                        type="radio"
                        value="card"
                        checked={selectedOption === 'card'}
                        onChange={handleOptionChange}
                      />
                      <img src={VisaImage} alt="Visa" className="paymentIcon" />
                      <img src={MastercardImage} alt="MasterCard" className="paymentIcon" />
                      <p>
                        You will be redirected to a secure payment page.
                        Please note that direct credit card payment is not allowed in all countries
                      </p>
                    </label>
                </div>
                <div className="radio">
                    <label>
                      <p>MPESA</p>
                      <input
                        type="radio"
                        value="mpesa"
                        checked={selectedOption === 'mpesa'}
                        onChange={handleOptionChange}
                      />
                      <img src={MpesaImage} alt="M-Pesa" className="paymentIcon" />
                    </label>
                  </div>
                {selectedOption === 'card' && (
                  <div className="card-details">
                    <label htmlFor="card-element">Card Details</label>
                    <CardElement id="card-element" options={{ hidePostalCode: true }} />
                  </div>
                )}
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <CartSummary />
    </>
  );
};

export default Checkout;
