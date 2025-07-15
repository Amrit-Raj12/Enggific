import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constants";



// Fetch all Product Types
export const fetchProductTypes = createAsyncThunk(
    "productTypeList/fetchProductTypes",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/get/productTypes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.productTypes; 
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message,
        });
      }
    }
  );

  // API call to create product type
  export const createProductType = createAsyncThunk(
    "productType/createProductType",
    async (productTypeData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL}/admin/create/productType`,
          productTypeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.productType;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to create product type",
        });
      }
    }
  );

  // API call to update product type
  export const updateProductType = createAsyncThunk(
    "productType/updateProductType",
    async (productTypeData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${BASE_URL}/admin/update/productType`,
          productTypeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.productType;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to update product type",
        });
      }
    }
  );

  // API call to delete product type
  export const deleteProductType = createAsyncThunk(
    "productType/deleteProductType",
    async (productTypeId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/admin/delete/productType`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id: productTypeId }, // Pass the id in the body
        });
        return response.data.deletedProductType;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to delete product type",
        });
      }
    }
  );

  const productTypeSlice = createSlice({
    name: "productTypeList",
    initialState: {
      productTypes: [],
      createProductTypeLoading: false,
      updateProductTypeLoading: false,
      deleteProductTypeLoading: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductTypes.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProductTypes.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.productTypes = action.payload || [];
        })
        .addCase(fetchProductTypes.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(createProductType.pending, (state) => {
          state.createProductTypeLoading = true;
          
        })  
        .addCase(createProductType.fulfilled, (state, action) => {
          state.createProductTypeLoading = false;
          state.productTypes.unshift(action.payload);
        })
        .addCase(createProductType.rejected, (state, action) => {
          state.createProductTypeLoading = false;
        })
        .addCase(updateProductType.pending, (state) => {
          state.updateProductTypeLoading = true;
        })
        .addCase(updateProductType.fulfilled, (state, action) => {
          state.updateProductTypeLoading = false;
          state.productTypes = state.productTypes.map((productType) => {
            if (productType._id === action.payload._id) {
              return action.payload;
            }
            return productType;
          });
        })
        .addCase(updateProductType.rejected, (state, action) => {
          state.updateProductTypeLoading = false;
        })
        .addCase(deleteProductType.pending, (state) => {
          state.deleteProductTypeLoading = true;
        })
        .addCase(deleteProductType.fulfilled, (state, action) => {
          state.deleteProductTypeLoading = false;
          console.log(action.payload);
          state.productTypes = state.productTypes.filter((productType) => productType._id !== action.payload._id);
        })
        .addCase(deleteProductType.rejected, (state, action) => {
          state.deleteProductTypeLoading = false;
        });
    },
  });

  export default productTypeSlice.reducer