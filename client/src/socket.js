import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io("https://hackerwar-be.onrender.com", {
	auth: {
		token: localStorage.getItem("token"),
	},
	autoConnect: false,
});
