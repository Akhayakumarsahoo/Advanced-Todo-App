import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isSidebarOpen = !action.payload;
    },
  },
});

export const { openSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
