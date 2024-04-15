import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksData: [
    {
      id: 1,
      course: "BCA",
      text: "Unlock your potential in the digital age with our dynamic BCA program.",
      link: "https://ignouadmission.samarth.edu.in/index.php/site/programme-detail?id=6f204386c359d7aeb65f9700e81f8958cacceaa803f708ac54a230a588c659ef1167",
    },
    {
      id: 2,
      course: "MCA",
      text: "Empower your career in technology with our prestigious MCA (Master of Computer Applications) program.",
      link: "https://www.ignouadmissions.com/distance-mca/",
    },
    {
      id: 3,
      course: "PGDCA",
      text: "Elevate your career in the digital realm with our comprehensive PGDCA (Post Graduate Diploma in Computer Applications) program.",
      link: "https://ignouadmission.samarth.edu.in/index.php/site/programme-detail?id=db6cf2758e95b3d7e1aa1eb3ab19fd8b6f46686f5c7c0e755af29b51767391961638",
    },
    {
      id: 4,
      course: "CIT",
      text: "Embark on a transformative journey in technology with our CIT (Certificate in Information Technology) program.",
      link: "https://www.ignouhelp.in/ignou-cit-prospectus/",
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
