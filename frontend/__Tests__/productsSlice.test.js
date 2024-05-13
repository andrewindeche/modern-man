import { fetchProducts, productsSlice } from 'store/productsSlice';
import { configureStore } from '@reduxjs/toolkit';

require('jest-fetch-mock').enableMocks();

describe('fetchProducts thunk', () => {
    it('should handle fetching products', async () => {
        const store = configureStore({ reducer: { products: productsSlice.reducer } });
        const category = 'suits';

        await store.dispatch(fetchProducts(category));
        
        const state = store.getState().products;
        expect(state.items).not.toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });
});

describe('products reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            items: [],
            loading: false,
            error: null,
        };
    });

    it('should return the initial state', () => {
        expect(productsSlice.reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle fetchProducts.pending', () => {
        const action = { type: fetchProducts.pending.type };
        const state = productsSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should handle fetchProducts.fulfilled', () => {
        const newProducts = [{ id: 1, name: 'Product 1' }];
        const action = { type: fetchProducts.fulfilled.type, payload: newProducts };
        const state = productsSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, items: newProducts, loading: false });
    });

    it('should handle fetchProducts.rejected', () => {
        const error = 'Fetch failed';
        const action = { type: fetchProducts.rejected.type, payload: error };
        const state = productsSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: error, loading: false });
    });
});