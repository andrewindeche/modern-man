import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (item, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: item.id, quantity: 1 }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return { item, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { payload } = action;
        const existingItem = state.items.find((item) => item.id === payload.item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...payload.item, quantity: 1 });
        }
        state.status = 'succeeded';
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
