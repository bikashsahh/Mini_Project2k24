import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    // { id: 4, message_text: "7wshjwbswswis" },
    // { id: 5, message_text: "6bikaaa" },
    // { id: 6, message_text: "5sddg" },
    // { id: 7, message_text: "4fhfh" },
    // { id: 8, message_text: "3aa" },
    // { id: 9, message_text: "2aa" },
    // { id: 10, message_text: "1ww" },
  ],
};

export const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, deleteMessage } = messageReducer.actions;

export default messageReducer.reducer;
