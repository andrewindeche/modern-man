import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import Mpesa from '../images/mastercard.webp';
import Visa from '../images/mpesa.webp';
import Mastercard from '../images/paypal.webp';
import Paypal from '../images/visa.webp';
import React from 'react';
import {
   faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
const Checkout = () => {
  return(
    <>
      <NotificationBar />
      <SearchBar />
      <NavButtons />
      <div className='checkout'>
        <div className='checkout-container'>
        <div className='personaldetails'>
        <h4 className='checkouttitle'>User Profile</h4>
          <ul className='aboutuser'>
          <p className='about'>About</p>
            <li>Andrew Indeche</li>
            <li>Westlands</li>
            <li>Nairobi, Kenya </li>
            <li id='email'>Indecheandrew@gmail.com</li>
            </ul>
        <div className='payments'>
          <p>Select Payment</p>
          <img src={Mpesa} alt="Mpesa" />
          <img src={Visa} alt="Visa" />
          <img src={Paypal} alt="Paypal" />
          <img src={Mastercard} alt="Mastercard" />
            </div>
        <div className='paymentselected'>
          <h4 className='checkouttitle'>Payment Selected</h4>
          <img src={Mpesa} alt="Blue Tuxedo" />
            </div>
        </div>
        <div className='checkoutdetails'>
          <div className="cartdetails">
            <h4>Cart Summary</h4>
            <span className='checkoutitem'><img alt="tuxedo"/>
            <p>Black Full Italian Men's Tuxedo * 2 </p>
            <a>$2000</a></span>
            <span className='checkoutitem'><img alt="tuxedo" />
            <p>Grey full Official Men's Suit * 1</p>
            <a>$1500</a></span>
            <span className='checkoutitem'><img alt="tuxedo" />
            <p>White full Official Men's Suit* 1</p>
            <a>$1800</a></span>
            </div>
            <div className='grandtotal'>
              <span className='checkoutamount'><p>SubTotal</p>
              <a>$3400</a></span>
              <span className='checkoutamount'><p>Shipping</p>
              <a>$0</a></span>
              <span className='checkoutamount'><p>Total</p>
              <a>$3400</a>
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
