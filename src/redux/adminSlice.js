import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdminData } = adminSlice.actions;

export default adminSlice.reducer;
