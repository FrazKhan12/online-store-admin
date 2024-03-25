import { createSlice } from "@reduxjs/toolkit";

const loader = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoader, hideLoader } = loader.actions;

export default loader.reducer;
