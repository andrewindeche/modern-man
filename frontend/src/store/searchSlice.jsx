import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/?search=${query}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateQuery } = searchSlice.actions;

export default searchSlice.reducer;
