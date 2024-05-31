import React, { useEffect } from 'react';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { initiateMpesaPayment } from '../store/mpesaSlice';
import MpesaImage from '../images/mpesa.webp';
import VisaImage from '../images/visa.webp';
import MastercardImage from '../images/mastercard.webp';
import { fetchStripePublicKey } from '../store/stripeSlice';
import { setSelectedOption, processPayment } from '../store/paymentSlice';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import CartSummary from '../components/CartSummary';
import TabBar from '../components/TabBar';
import Footer from '../components/Footer';

const Checkout = () => {
  const dispatch = useDispatch();
  const stripePublicKey = useSelector((state) => state.stripe.publicKey);
  const stripeStatus = useSelector((state) => state.stripe.status);
  const selectedOption = useSelector((state) => state.payment.selectedOption);
  const paymentStatus = useSelector((state) => state.payment.status);
  const paymentError = useSelector((state) => state.payment.error);

  const stripe = useStripe();
  const elements = useElements();

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
    if (selectedOption === 'mpesa') {
      const phoneNumber = event.target.phoneNumber.value;
      const amount = event.target.amount.value;
      dispatch(initiateMpesaPayment({ phone_number: phoneNumber, amount }));
    } else if (selectedOption === 'card') {
      if (!stripe || !elements) {
        return;
      }
      dispatch(processPayment({ stripe, elements, selectedOption }));
    }

    if (stripeStatus === 'loading' || !stripePublicKey) {
      return <div>Loading...</div>;
    }
  };
  const stripePromise = loadStripe(stripePublicKey);
  return (
    <>
      <NotificationBar />
      <SearchBar />
      <NavButtons />
      <Elements stripe={stripePromise}>
        <TabBar
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          handleSubmit={handleSubmit}
          VisaImage={VisaImage}
          MastercardImage={MastercardImage}
          MpesaImage={MpesaImage}
        />
      </Elements>
      <CartSummary />
      <Footer />
    </>
  );
};

export default Checkout;
