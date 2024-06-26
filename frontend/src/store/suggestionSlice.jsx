import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  suggestions: [],
  loading: false,
  error: null,
};

export const fetchSuggestions = createAsyncThunk(
  'suggestions/fetchSuggestions',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/suggestions/?query=${query}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuggestions } = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
