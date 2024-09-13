import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		loading: false,
		user: null,
		alumni: null,
		alumniList: [],
		onlineUsers: [],
		socketConnection: null,
		alumniUnapproved: [],
		searchResult: null,
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		login: (state, action) => {
			state.user = action.payload;
		},
		setAlumni: (state, action) => {
			state.alumni = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.alumni = null;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
		},
		setOnline: (state, action) => {
			state.onlineUsers = action.payload;
		},
		setSocketConnection: (state, action) => {
			state.socketConnection = action.payload;
		},
		setAllAlumni: (state, action) => {
			state.alumniList = action.payload;
		},
		setAlumniUnapproved: (state, action) => {
			state.alumniUnapproved = action.payload;
		},
		setSearchResult: (state, action) => {
			state.searchResult = action.payload;
		},
	},
});

export const {
	setLoading,
	login,
	logout,
	updateUser,
	setAlumni,
	setOnline,
	setSocketConnection,
	setAllAlumni,
	setAlumniUnapproved,
	setSearchResult,
} = authSlice.actions;
export default authSlice.reducer;
