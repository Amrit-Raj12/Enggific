import { BASE_URL } from "@/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for client login
export const clientLogin = createAsyncThunk(
  "clientAuth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, formData);
      localStorage.setItem("clientToken", response.data.token); // Save token in local storage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState: {
    user: null,
    token: localStorage.getItem("clientToken") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("clientToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clientLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clientLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(clientLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
