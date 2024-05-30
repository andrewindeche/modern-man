import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initiateMpesaPayment = createAsyncThunk(
  'mpesa/initiatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/mpesa/charge/', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const mpesaSlice = createSlice({
  name: 'mpesa',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiateMpesaPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initiateMpesaPayment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(initiateMpesaPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default mpesaSlice.reducer;
