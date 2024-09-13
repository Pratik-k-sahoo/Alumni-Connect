import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
	name: "events",
	initialState: {
		approvedEvents: [],
		adminEvents: [],
		posts: [],
		postsByEvent: [],
	},
	reducers: {
		setApprovedEvents: (state, action) => {
			state.approvedEvents = action.payload;
		},
		setAdminEvents: (state, action) => {
			state.adminEvents = action.payload;
		},
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setPostsByEvent: (state, action) => {
			state.postsByEvent = action.payload;
		},
	},
});

export const { setApprovedEvents, setAdminEvents, setPosts, setPostsByEvent } =
	eventSlice.actions;
export default eventSlice.reducer;
