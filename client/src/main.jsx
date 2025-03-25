import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/storeConfig.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
	 <Provider store={store}>
	 	<PersistGate loading={null} persistor={persistor}>
	 		<App />
	 	</PersistGate>
	<Toaster />
	</Provider>
	// <div className="flex w-full h-full items-center justify-center font-bold text-2xl">
		// Site Under Maintainance
	// </div>
);
