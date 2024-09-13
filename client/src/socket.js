import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io("https://vercel-hackerwar.vercel.app/", {
	auth: {
		token: Cookies.get("token"),
	},
	autoConnect: false,
});
