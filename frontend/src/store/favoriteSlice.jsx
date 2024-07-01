import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFavoritesThunk = createAsyncThunk('favorites/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/favorites/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchFavoriteCountThunk = createAsyncThunk('favorites/fetchCount', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/favorites/count/');
    return response.data.count;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    count: 0,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    incrementCount(state) {
      state.count += 1;
    },
    resetCount(state) {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteCountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteCountThunk.fulfilled, (state, action) => {
        state.count = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavoriteCountThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavoritesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { incrementCount, resetCount } = favoriteSlice.actions;
export default favoriteSlice.reducer;
