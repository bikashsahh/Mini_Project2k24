import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuretteData: [
    // Add more featurette data objects as needed
  ],
};

export const listingBannerReducer = createSlice({
  name: "listing",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.featuretteData.unshift(action.payload);
    },
    deleteList: (state, action) => {
      state.featuretteData = state.featuretteData.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addList, deleteList } = listingBannerReducer.actions;

export default listingBannerReducer.reducer;
