import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, { fetchDiscountedProducts } from 'store/discountsSlice';

jest.mock('axios');

describe('discounts slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        discount: reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: { axios },
          },
        }),
    });
  });

  describe('fetchDiscountedProducts', () => {
    it('should handle initial state', () => {
      expect(store.getState().discount).toEqual({
        items: [],
        loading: false,
        error: null,
      });
    });

    it('should handle fetchDiscountedProducts pending', () => {
      const action = { type: fetchDiscountedProducts.pending.type };
      store.dispatch(action);
      expect(store.getState().discount).toEqual({
        items: [],
        loading: true,
        error: null,
      });
    });

    it('should handle fetchDiscountedProducts fulfilled', async () => {
      const responseData = [{ id: 1, name: 'Product 1', discount_percentage: 20 }];
      axios.get.mockResolvedValue({ data: responseData });

      await store.dispatch(fetchDiscountedProducts());
      expect(store.getState().discount).toEqual({
        items: responseData,
        loading: false,
        error: null,
      });
    });

    it('should handle fetchDiscountedProducts rejected', async () => {
      const error = new Error('Network Error');
      axios.get.mockRejectedValue(error);

      await store.dispatch(fetchDiscountedProducts());
      expect(store.getState().discount).toEqual({
        items: [],
        loading: false,
        error: error.message,
      });
    });
  });
});
