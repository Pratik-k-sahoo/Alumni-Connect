import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
	name: "feedback",
	initialState: {
		community: [],
	},
	reducers: {
		setCommunity: (state, action) => {
			state.community = action.payload;
		},
	},
});

export const { setCommunity } = communitySlice.actions;
export default communitySlice.reducer;
