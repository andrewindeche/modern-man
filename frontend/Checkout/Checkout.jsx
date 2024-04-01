import React from 'react';
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import Mpesa from '../src/images/mastercard.png'
import Visa from '../src/images/mpesa.png'
import Mastercard from '../src/images/paypal.png'
import Paypal from '../src/images/visa.png'

const Checkout = () => {
    return(
        <>
          <NotificationBar />
          <SearchBar />
          <div className='checkout'>
          <div className='personaldetails'>
          <h1 className='checkout-header'>Check Out</h1>
          <h4 className='checkouttitle'>Personal Information</h4>
            <ul className='aboutuser'>
            <h4 className='checkouttitle'>About</h4>
              <li>Andrew Indeche</li>
              <li>Westlands</li>
              <li>Nairobi, Kenya </li>
              <li>Indecheandrew@gmail.com</li>
            </ul>
          <div className='payments'>
          <h4 className='checkouttitle'>Select Payment</h4>
          <img src={Mpesa} alt="Mpesa" />
          <img src={Visa} alt="Visa" />
          <img src={Mastercard} alt="Mastercard" />
          <img src={Paypal} alt="Paypal" />
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