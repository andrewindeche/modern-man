import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDiscountedProducts = createAsyncThunk(
    'discount/fetchDiscountedProducts',
    async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/discounted-products/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchHighestDiscountProduct = createAsyncThunk(
    'discount/fetchHighestDiscountProduct',
    async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/highest-discount-product/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        items: [],
        highestDiscountProduct: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscountedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDiscountedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchHighestDiscountProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHighestDiscountProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.highestDiscountProduct = action.payload;
            })
            .addCase(fetchHighestDiscountProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default discountSlice.reducer;
