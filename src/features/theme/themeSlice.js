import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    swap: (state) => {
      if (state.color === "light") {
        return state.color === "dark";
      } else {
        return state.color === "light";
      }
    },
  },
});

export const { swap } = themeSlice.actions;

export default themeSlice.reducer;
