import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import searchReducer from './searchSlice';
import discountReducer from './discountsSlice';
import userReducer from './userSlice';
import stripeReducer from './stripeSlice';
import paymentReducer from './paymentSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
    discount: discountReducer,
    user: userReducer,
    stripe: stripeReducer,
    payment: paymentReducer,
  },
});

export default store;
