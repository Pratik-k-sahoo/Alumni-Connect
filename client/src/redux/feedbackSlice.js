import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
	name: "feedback",
	initialState: {
		feedbacks: [],
	},
	reducers: {
		setFeedbacks: (state, action) => {
			state.feedbacks = action.payload;
		},
	},
});

export const { setFeedbacks } = feedbackSlice.actions;
export default feedbackSlice.reducer;
