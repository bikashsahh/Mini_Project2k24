import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "Dashboard",
};

export const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTab } = selectedTabSlice.actions;

export default selectedTabSlice.reducer;
