import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import Mpesa from '../images/mastercard.webp';
import Visa from '../images/mpesa.webp';
import Mastercard from '../images/paypal.webp';
import Paypal from '../images/visa.webp';
import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
const Checkout = () => {
  return(
    <>
      <NotificationBar />
      <SearchBar />
      <NavButtons />
      <Tab.Container defaultActiveKey= "Billing Details">
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
          <label>First and Last Name:</label><input />
            <label>Email Address:</label><input />
            <label className="locationHeading">Delivery Details</label>
            <span className="locationAddress">
              <label>Location:</label><input />
            <label>Building:</label><input /></span>
          </form>
        </Tab.Pane>
        <Tab.Pane eventKey="Payment Options">
          <h4>Content for Tab 3</h4>
          <p>This is the content for the third tab.</p>
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
export default Checkout
