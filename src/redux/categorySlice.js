import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, Token } from "@/constants";

// Fetch all Categories
export const fetchCategories = createAsyncThunk(
    "categoryList/fetchCategories",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/get/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.categories; 
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message,
        });
      }
    }
  );

  // API call to create category
  export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (categoryData, { rejectWithValue }) => {
      
      
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
         `${BASE_URL}/admin/create/category`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.category;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to create category",
        });
      }
    }
  );

  // API call to update category
  export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (categoryData, { rejectWithValue }) => {
      
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${BASE_URL}/admin/update/category`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.category;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to update category",
        });
      }
    }
  );

  // API call to delete category
  export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (categoryId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/admin/delete/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id: categoryId }, // Pass the id in the body
        });
        return response.data.deletedCategory;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to delete category",
        });
      }
    }
  );

  const cateogorySlice = createSlice({
    name: "categoryList",
    initialState: {
      categories: [],
      createCategoryLoading: false,
      updateCategoryLoading: false,
      deleteCategoryLoading: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.categories = action.payload || [];
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(createCategory.pending, (state) => {
          state.createCategoryLoading = true;
          
        })  
        .addCase(createCategory.fulfilled, (state, action) => {
          state.createCategoryLoading = false;
          state.categories.unshift(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.createCategoryLoading = false;
        })
        .addCase(updateCategory.pending, (state) => {
          state.updateCategoryLoading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.updateCategoryLoading = false;
          state.categories = state.categories.map((category) => {
            if (category._id === action.payload._id) {
              return action.payload;
            }
            return category;
          });
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.updateCategoryLoading = false;
        })
        .addCase(deleteCategory.pending, (state) => {
          state.deleteCategoryLoading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.deleteCategoryLoading = false;
          console.log(action.payload);
          state.categories = state.categories.filter((category) => category._id !== action.payload._id);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.deleteCategoryLoading = false;
        });
    },
  });

  export default cateogorySlice.reducer