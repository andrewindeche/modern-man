import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

const TabBar = ({
  selectedOption,
  handleOptionChange,
  handleSubmit,
  VisaImage,
  MastercardImage,
  MpesaImage,
}) => (
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
          <label htmlFor="fullName" className="locationHeading">Personal Details</label>
          <label htmlFor="fullName">First and Last Name:</label>
          <input placeholder="Enter Your First and Last Name" />
          <label htmlFor="email">Email Address:</label>
          <input placeholder="Enter Your Email Address" />
          <label htmlFor="deliveryDetails" className="locationHeading">Delivery Details</label>
          <span className="locationAddress">
            <label  htmlFor="location">Location:</label>
            <input placeholder="Enter Your Delivery Location" />
            <label htmlFor="building">Building:</label>
            <input id="building" placeholder="Enter Your Building Details" />
          </span>
          <span className="checkoutamount">
            <button type="button">Save</button>
          </span>
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
                  Please note that direct credit card payment is not allowed in all countries
                </p>
                {selectedOption === 'card' && (
                <div className="card-details">
                  <label htmlFor="card-element">Card Details</label>
                  <CardElement id="card-element" options={{ hidePostalCode: true }} />
                </div>
                )}
              </label>
            </div>
            <div className="radio">
              <label>
                <p>MPESA</p>
                <input
                  type="radio"
                  id="mpesaOption"
                  value="mpesa"
                  checked={selectedOption === 'mpesa'}
                  onChange={handleOptionChange}
                />
                <img src={MpesaImage} alt="M-Pesa" className="paymentIcon" />
              </label>
              {selectedOption === 'mpesa' && (
              <div className="mpesa-details">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" />
                <label htmlFor="amount">Amount</label>
                <input id="amount" name="amount" placeholder="Enter the amount" />
              </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </Tab.Pane>
    </Tab.Content>
  </Tab.Container>
);
TabBar.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  VisaImage: PropTypes.string.isRequired,
  MastercardImage: PropTypes.string.isRequired,
  MpesaImage: PropTypes.string.isRequired,
};

export default TabBar;
