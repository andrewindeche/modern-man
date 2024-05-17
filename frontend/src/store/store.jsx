import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import searchReducer from './searchSlice';
import discountReducer from './discountsSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer,
        discount: discountReducer,
        user: userReducer
    },
});

export default store;
