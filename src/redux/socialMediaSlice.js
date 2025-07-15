import { BASE_URL } from "@/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSocialMediaLink = createAsyncThunk(
    "socialMediaLink/addSoicalMediaLink",
    async (socialMediaLink, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${BASE_URL}/admin/add/socialMediaLink`,
          socialMediaLink,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.newLink;
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          error: error.response?.data?.message || "Failed to add social media link",
        });
      }
    }
  );

  // Fetch all social media links
  export const fetchSocialMediaLinks = createAsyncThunk(
    "socialMediaLinkList/fetchSocialMediaLinks",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/admin/get/socialMediaLinks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        return response.data.links;
      } catch (error) {
        console.log(error, "fetch social media links error");
        return rejectWithValue(error.response?.data || "Failed to fetch social media links");
      }
    }
  );


const socialMediaLinkSlice = createSlice({
    name: "socialMediaLinkList",
    initialState: {
      socialMediaLinks: [],
      fetchLoading: false,
      addLoading: false, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSocialMediaLink.pending, (state) => {
                state.addLoading = true;
            })
            .addCase(addSocialMediaLink.fulfilled, (state, action) => {
                state.addLoading = false;
                state.socialMediaLinks.push(action.payload);
            })
            .addCase(addSocialMediaLink.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchSocialMediaLinks.pending, (state) => {
                state.fetchLoading = true; 
            })
            .addCase(fetchSocialMediaLinks.fulfilled, (state, action) => {  
                state.fetchLoading = false;
                state.socialMediaLinks = action.payload;
            })
            .addCase(fetchSocialMediaLinks.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload;
            })
           
    },
});

export default socialMediaLinkSlice.reducer


