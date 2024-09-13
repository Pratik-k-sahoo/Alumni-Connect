import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io("/", {
	auth: {
		token: Cookies.get("token"),
	},
	autoConnect: false,
});
