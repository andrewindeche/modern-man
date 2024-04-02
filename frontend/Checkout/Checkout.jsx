import React from 'react';
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';
import Mpesa from '../src/images/mastercard.png'
import Visa from '../src/images/mpesa.png'
import Mastercard from '../src/images/paypal.png'
import Paypal from '../src/images/visa.png'

const Checkout = () => {
    return(
        <>
          <NotificationBar />
          <SearchBar />
          <NavButtons />
          <div className='checkout'>
          <h1>Check Out</h1>
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
      </div>
        </>
    )
}
export default Checkout