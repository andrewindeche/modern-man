import productsReducer, { fetchProducts } from 'store/productsSlice';

describe('products reducer', () => {
    const initialState = {
        items: [],
        loading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(productsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle fetchProducts.pending', () => {
        const action = { type: fetchProducts.pending.type };
        const state = productsReducer(initialState, action);
        expect(state).toEqual({ ...initialState, loading: true });
    });

    it('should handle fetchProducts.fulfilled', () => {
        const newProducts = [{ id: 1, name: 'Product 1' }];
        const action = { type: fetchProducts.fulfilled.type, payload: newProducts };
        const state = productsReducer(initialState, action);
        expect(state).toEqual({ ...initialState, items: newProducts, loading: false });
    });

    it('should handle fetchProducts.rejected', () => {
        const error = 'Fetch failed';
        const action = { type: fetchProducts.rejected.type, error: { message: error } };
        const state = productsReducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: error, loading: false });
    });
});
