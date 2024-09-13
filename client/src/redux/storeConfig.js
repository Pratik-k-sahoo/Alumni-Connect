import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationsSlice from "./applicationsSlice";
import eventSlice from "./eventSlice";
import communitySlice from "./communitySlice";
import feedbackSlice from "./feedbackSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: authSlice,
	jobs: jobSlice,
	application: applicationsSlice,
    event: eventSlice,
    community: communitySlice,
    feedback: feedbackSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
});

export default store;
