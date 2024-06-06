import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async ({ stripe, elements, selectedOption }, { rejectWithValue }) => {
    if (selectedOption === 'card' && stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      try {
        const { token } = await stripe.createToken(cardElement);
        const response = await axios.post('http://127.0.0.1:8000/api/stripe/charge', {
          token: token.id,
          amount: 1000,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    } else {
      return `Selected payment method: ${selectedOption}`;
    }
  },
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    selectedOption: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedOption } = paymentSlice.actions;

export default paymentSlice.reducer;
