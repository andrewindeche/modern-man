import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        search: searchReducer
    },
});

export default store;
