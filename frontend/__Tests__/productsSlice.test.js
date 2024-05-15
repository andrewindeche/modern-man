import { fetchProducts, productsSlice } from 'store/productsSlice';

require('jest-fetch-mock').enableMocks();

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