import { createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
  name: "position",
  initialState: {
    value: "fixed",
  },
  reducers: {
    setRelative: (state) => {
      state.value = "relative";
    },
    setFixed: (state) => {
      state.value = "fixed";
    },
  },
});

export const { setRelative, setFixed } = positionSlice.actions;
export default positionSlice.reducer;
