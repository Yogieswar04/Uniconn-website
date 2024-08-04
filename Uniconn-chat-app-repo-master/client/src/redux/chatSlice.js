// src/redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    mentorId: null,
  },
  reducers: {
    setMentorId: (state, action) => {
      state.mentorId = action.payload;
    },
    clearMentorId: (state) => {
      state.mentorId = null;
    },
  },
});

export const { setMentorId, clearMentorId } = chatSlice.actions;
export default chatSlice.reducer;
