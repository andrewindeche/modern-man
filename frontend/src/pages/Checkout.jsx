import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import React, { useState } from 'react';
import Mpesa from '../images/mastercard.webp';
import Visa from '../images/mpesa.webp';
import Mastercard from '../images/paypal.webp';
import Paypal from '../images/visa.webp';
import { Tab, Nav } from 'react-bootstrap';
const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected payment method: ${selectedOption}`);
  };
  return(
    <>
      <NotificationBar />
      <SearchBar />
      <NavButtons />
      <Tab.Container defaultActiveKey= "Billing Details" >
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
          <form className='billingdetails'>
          <label className="locationHeading">Personal Details</label>
          <label>First and Last Name:</label><input placeholder="Enter Your First and Last Name" />
            <label>Email Address:</label><input placeholder="Enter Your Email Address" />
            <label className="locationHeading">Delivery Details</label>
            <span className="locationAddress">
              <label>Location:</label><input placeholder="Enter Your Delivery Location" />
            <label>Building:</label><input placeholder="Enter Your Building Details" /></span>
            <span className='checkoutamount'><button>Save</button></span>
          </form>
        </Tab.Pane>
        <Tab.Pane eventKey="Payment Options">
        <div className="payment-options">
      <h3>Select Payment Method</h3>
      <form onSubmit={handleSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="card"
              checked={selectedOption === 'card'}
              onChange={handleOptionChange}
            />
            Card Payment
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={selectedOption === 'mpesa'}
              onChange={handleOptionChange}
            />
            M-Pesa
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
        </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <div className='checkout'>
        <div className='checkout-container'>
        <div className='checkoutdetails'>
          <div className="cartdetails">
            <h4>Cart Summary</h4>
            <span className='checkoutitem'><img alt="tuxedo"/>
            <p>2 * Black Full Italian Men's Tuxedo</p>
            <p className='amount'>$2000</p>
            </span>
            <span className='checkoutitem'><img alt="tuxedo" />
            <p>1 * Grey full Official Men's Suit</p>
            <p className='amount'>$1500</p></span>
            <span className='checkoutitem'><img alt="tuxedo" />
            <p>1 * White full Official Men's Suit</p>
            <p className='amount'>$1800</p></span>
            </div>
            <div className='grandtotal'>
              <span className='checkoutamount'><p>SubTotal</p>
              <p className='amount'>$3400</p></span>
              <span className='checkoutamount'><p>Shipping</p>
              <p className='amount'>$0</p></span>
              <span className='checkoutamount'><p>Total</p>
              <p className='amount'>$3400</p>
              </span>
              <span className='checkoutamount'><button>Place Order</button></span>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export default Checkout;
