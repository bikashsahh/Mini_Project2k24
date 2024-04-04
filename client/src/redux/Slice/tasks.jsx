import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksData: [
    {
      id: 1,
      image: "/logo.webp",
      heading: "Heading 1",
      text: "Some representative placeholder content for the first column.",
    },
    {
      id: 2,
      image: "/img1.webp",
      heading: "Heading 2",
      text: "Some representative placeholder content for the second column.",
    },
    {
      id: 3,
      image: "/logo.webp",
      heading: "Heading 1",
      text: "Some representative placeholder content for the first column.",
    },
    {
      id: 4,
      image: "/img1.webp",
      heading: "Heading 2",
      text: "Some representative placeholder content for the second column.",
    },
    {
      id: 5,
      image: "/logo.webp",
      heading: "Heading 1",
      text: "Some representative placeholder content for the first column.",
    },
    {
      id: 6,
      image: "/img1.webp",
      heading: "Heading 2",
      text: "Some representative placeholder content for the second column.",
    },
  ],
};

export const tasksReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      state.messages.unshift(action.payload);
    },
    deleteTasks: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTasks, deleteTasks } = tasksReducer.actions;

export default tasksReducer.reducer;
