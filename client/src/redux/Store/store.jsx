import { configureStore } from "@reduxjs/toolkit";

import messageReducer from "../Slice/message";
import tasksReducer from "../Slice/tasks";
import listingBannerReducer from "../Slice/listingBanner";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    task: tasksReducer,
    listing: listingBannerReducer,
  },
});
