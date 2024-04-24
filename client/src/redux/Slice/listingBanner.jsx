import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuretteData: [
    {
      heading: "First featurette heading.",
      text: "Some great placeholder content for the first featurette here. Imagine some exciting prose here.",
      image: "/img1.webp", // Image URL for the first featurette
    },
    {
      heading: "Oh yeah, it’s that good.",
      text: "Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.",
      order: "second",
      image: "/img2.webp", // Image URL for the second featurette
    },
    {
      heading: "First featurette heading.",
      text: "Some great placeholder content for the first featurette here. Imagine some exciting prose here.",
      image: "/img1.webp", // Image URL for the first featurette
    },
    {
      heading: "Oh yeah, it’s that good.",
      text: "Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.",
      order: "second",
      image: "/img2.webp", // Image URL for the second featurette
    },
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
