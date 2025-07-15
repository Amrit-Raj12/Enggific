import { createSlice } from "@reduxjs/toolkit";

// Load stored IDs from localStorage initially
const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem("storedIds");
  return storedData ? JSON.parse(storedData) : [];
};

const initialState = {
  ids: loadFromLocalStorage(),
};

const idSlice = createSlice({
  name: "idStore",
  initialState,
  reducers: {
    addId: (state, action) => {
        const { idType, id } = action.payload;
        const existingIndex = state.ids.findIndex((item) => item.idType === idType);
      
        if (existingIndex !== -1) {
          // Update existing ID
          state.ids[existingIndex].id = id;
        } else {
          // Add new ID
          state.ids.push({ idType, id });
        }
      
        localStorage.setItem("storedIds", JSON.stringify(state.ids)); // Save updated state
      },
    removeId: (state, action) => {
      state.ids = state.ids.filter((item) => item.idType !== action.payload);
      localStorage.setItem("storedIds", JSON.stringify(state.ids));
    },
    clearIds: (state) => {
      state.ids = [];
      localStorage.removeItem("storedIds");
    },
  },
});

export const { addId, removeId, clearIds } = idSlice.actions;
export default idSlice.reducer;
