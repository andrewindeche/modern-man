import React from 'react';
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';
import Mpesa from '../src/images/mastercard.png';
import Visa from '../src/images/mpesa.png';
import Mastercard from '../src/images/paypal.png';
import Paypal from '../src/images/visa.png';
import Suit1 from '../src/images/tuxedo1.jpg';
import Suit3 from '../src/images/white tux.jpg';

const Checkout = () => {
    return(
        <>
          <NotificationBar />
          <SearchBar />
          <NavButtons />
          <div className='checkout'>
          <h1 id="Checkout">Check Out</h1>
          <div className='personaldetails'>
          <h4 className='checkouttitle'>Personal Information</h4>
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
          <div className="cartdetails">
            <h4>Shopping Cart Details</h4>
            <span className='checkoutitem'><img src={Suit1} alt="tuxedo"/>
            <p>Black Full Italian Men's Tuxedo * 2 </p>
            <a>$2000</a></span>
            <span className='checkoutitem'><img src={Suit1} alt="tuxedo" />
            <p>Grey full Official Men's Suit * 1</p>
            <a>$1500</a></span>
            <span className='checkoutitem'><img src={Suit3} alt="tuxedo" />
            <p>White full Official Men's Suit* 1</p>
            <a>$1800</a></span>
            </div>
            <div className='grandtotal'>
              <span className='checkoutamount'><p>SubTotal</p>
              <a>$3400</a></span>
              <span className='checkoutamount'><p>Shipping</p>
              <a>$0</a></span>
              <span className='checkoutamount'><p>Total</p>
              <a>$3400</a></span>
            </div>
        </div>
        </>
    )
}
export default Checkout