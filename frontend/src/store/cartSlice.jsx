import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_API_URL = 'http://127.0.0.1:8000/api/';

const loadCartFromStorage = () => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (item, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const token = localStorage.getItem('token');
      
      if (user.isAuthenticated && token) {
        const response = await fetch(`${BASE_API_URL}cart/add/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: item.id, quantity: 1 }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }
        
        const data = await response.json();
        return { item, data, isOnline: true };
      }
      
      return { item, isOnline: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    total: 0,
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
      saveCartToStorage(state.items);
      state.total = state.items.reduce((sum, item) => sum + (item.discounted_price || item.price) * item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveCartToStorage(state.items);
      state.total = state.items.reduce((sum, item) => sum + (item.discounted_price || item.price) * item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveCartToStorage(state.items);
        state.total = state.items.reduce((sum, item) => sum + (item.discounted_price || item.price) * item.quantity, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { item, isOnline } = action.payload;
        
        if (isOnline) {
          state.status = 'succeeded';
        } else {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.items.push({ ...item, quantity: 1 });
          }
          saveCartToStorage(state.items);
          state.status = 'succeeded';
        }
        
        state.total = state.items.reduce((sum, item) => sum + (item.discounted_price || item.price) * item.quantity, 0);
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;