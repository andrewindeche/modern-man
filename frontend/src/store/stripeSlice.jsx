import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStripePublicKey = createAsyncThunk(
  'stripe/fetchStripePublicKey',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/stripe-public-key/');
    return response.data.publicKey;
  },
);

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: {
    publicKey: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStripePublicKey.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStripePublicKey.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publicKey = action.payload;
      })
      .addCase(fetchStripePublicKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stripeSlice.reducer;
