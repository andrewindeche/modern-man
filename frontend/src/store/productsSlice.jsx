import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, discounted }, { rejectWithValue }) => {
    try {
      let url = `http://127.0.0.1:8000/api/products`;
      if (discounted) {
        url = `http://127.0.0.1:8000/api/products/discounted-products`;
      } else if (category) {
        url += `?category=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Server error occurred!');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
