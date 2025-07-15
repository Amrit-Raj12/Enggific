import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constants";

// Async thunk for creating a brand
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (formData, { rejectWithValue }) => {
    console.log("createBrand thunk started", formData);

    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/admin/add/brand`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || "Failed to create brand"
      });
    }
  }
);

// Async thunk for fetching all brands
export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/get/brands`);
      return response.data.brands;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a brand
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/admin/delete/brand`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { "imageId":id },
    },
      );
      console.log("rrr",response.data);
      return response.data.id;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || "Failed to delete brand"
      });
    }
  }
);


  

// Initial state
const initialState = {
  brands: [],
  loading: false,
  error: null,
};

// brand slice
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle create brand
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload.brand); // Add new brand to the list
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Handle fetch brands
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload; // Set fetched brands
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Handle delete brand
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default brandSlice.reducer;
