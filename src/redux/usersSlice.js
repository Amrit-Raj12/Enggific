import { BASE_URL } from "@/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all Categories
export const fetchUsers = createAsyncThunk(
    "usersList/fetchUsers",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/get/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
      }
    }
  );

  export const editUser = createAsyncThunk(
    "usersList/editUser",
    async (userData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${BASE_URL}/admin/edit/user`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.user;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to update product",
        });
      }
    }
  );

  export const deleteUser = createAsyncThunk(
    "usersList/deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
         `${BASE_URL}/admin/delete/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: { id },
          }
        );
        return response.data.user;
      } catch (error) {
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to delete product",
        });
      }
    }
  );

  const usersSlice = createSlice({
    name: "usersList",
    initialState: {
      users: [],
      status: "idle",
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.users = action.payload || [];
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(editUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(editUser.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.users = state.users.map((user) => {
            if (user._id === action.payload._id) {
              return action.payload;
            }
            return user;
          });
        })
        .addCase(editUser.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(deleteUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.users = state.users.filter((user) => user._id !== action.payload._id);
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export default usersSlice.reducer