import { BASE_URL } from "@/constants";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPrivacy = createAsyncThunk(
    'privacy/fetchPrivacy',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/privacyPolicy`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch privacy policy');
        }
    });

export const updatePrivacy = createAsyncThunk(
    'privacy/updatePrivacy',
    async (content, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token'); // Get token from local storage

            // Set the Authorization header
            const response = await axios.patch(`${BASE_URL}/privacyPolicy`, { content }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to headers
                },
            });

            return response.data; // Return the response data on success
        } catch (error) {
            return rejectWithValue({
                error: error.response?.data?.message || "Failed to update privacy policy"
            });
        }
    }
);

const privacySlice = createSlice({
    name: 'privacy',
    initialState: {
        content: '',
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPrivacy.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPrivacy.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.status = 'succeeded';
            })
            .addCase(fetchPrivacy.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updatePrivacy.fulfilled, (state, action) => {
                state.content = action.payload.content;
            });
    }
});

export default privacySlice.reducer;
