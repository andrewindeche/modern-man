import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import store from './store/store';
import App from './App';
import { fetchStripePublicKey } from './store/stripeSlice';

const appNode = createRoot(document.getElementById('ModernMan'));

const Root = () => {
  const [stripePromiseLoaded, setStripePromiseLoaded] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(null);

  useEffect(() => {
    store.dispatch(fetchStripePublicKey()).then(() => {
      const stripePublicKey = store.getState().stripe.publicKey;

      loadStripe(stripePublicKey).then((stripe) => {
        setStripeLoaded(stripe);
        setStripePromiseLoaded(true);
      });
    });
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          {stripePromiseLoaded && (
            <Elements stripe={stripeLoaded}>
              <App />
            </Elements>
          )}
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

appNode.render(<Root />);
