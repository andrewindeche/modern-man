import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DJANGO_AUTH_API_URL = 'http://127.0.0.1:8000/api/token/';
const SECOND_STEP_API_URL = 'http://127.0.0.1:8000/api/second-step-auth/';
const VERIFY_CODE_API_URL = 'http://127.0.0.1:8000/api/verify-code/';

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials) => {
    try {
      const djangoResponse = await axios.post(DJANGO_AUTH_API_URL, credentials);
      const token = djangoResponse.data.access;

      await axios.post(SECOND_STEP_API_URL, { email: credentials.email });

      return { token };
    } catch (error) {
      throw error.response ? error.response.data.error : error.message;
    }
  },
);

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ email, code }) => {
    try {
      const response = await axios.post(VERIFY_CODE_API_URL, { email, code });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.error : error.message;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
