import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_API_URL = 'http://127.0.0.1:8000/api/';

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}register/`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}token/`, { username, password });
      const token = response.data.access;
      localStorage.setItem('token', token);
      return { token };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  },
);

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ username, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}verify-code/`, { username, code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        console.log('Login fulfilled', state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : action.error.message;
        console.error('Login rejected', action.payload);
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : action.error.message;
      });
  },
});

export const { logoutUser, resetError } = userSlice.actions;

export default userSlice.reducer;
