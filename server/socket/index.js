import express from "express";
import { Server } from "socket.io";
import http from "http";
import { getUserDetailsFromToken } from "../helper/getUserDetailsFromToken.js";
import UserModel from "../models/userModel.js";
import { MessageModel } from "../models/messageModel.js";
import { ChatModel } from "../models/chatModel.js";
import getAllChats from "../helper/getAllChats.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["*"],
		credential: true,
	},
});

//Online User
const onlineUser = new Set();

io.on("connection", async (socket) => {
	console.log("user connected", socket.id);
	const token = socket.handshake.auth.token;
	let user;
	const response = await getUserDetailsFromToken(token);
	if (response.success) {
		user = response.user;
	}

	socket.join(user?._id?.toString());
	onlineUser.add(user?._id?.toString());

	io.emit("online-users", Array.from(onlineUser));

	// For message Page
	socket.on("message-page", async (data) => {
		console.log("message-page", data);

		if(data) {
            const userPage = await UserModel.findById(data).select("-password");
			const payload = {
				name: userPage?.name,
				_id: userPage?._id,
				email: userPage?.email,
				profilePic: userPage?.profile?.profileImage,
				online: onlineUser.has(userPage?._id?.toString()),
			};
			socket.emit("message-user", payload);
			//Get Previous Message
			const chats = await ChatModel.findOne({
				$or: [
					{ sender: user?._id, receiver: data },
					{ sender: data, receiver: user?._id },
				],
			}).populate({
				path: "messages",
				options: { sort: { created_at: -1 } },
			});
			socket.emit("message", chats?.messages);
        }
	});

	// new Message
	socket.on("send-message", async (data) => {
		const { sender, receiver, text, imageUrl, videoUrl } = data;
		//Create message
		const message = await MessageModel.create({
			text,
			imageUrl,
			videoUrl,
			messageBy: sender,
		});

		//Check previous conversation
		let conversation = await ChatModel.findOne({
			$or: [
				{ sender, receiver },
				{ sender: receiver, receiver: sender },
			],
		});
		if (!conversation) {
			conversation = await ChatModel.create({
				sender,
				receiver,
				messages: [message._id],
			});
		} else {
			conversation = await ChatModel.updateOne(
				{ _id: conversation._id },
				{
					$push: {
						messages: message?._id,
					},
				}
			);
		}
		const chats = await ChatModel.findOne({
			$or: [
				{ sender, receiver },
				{ sender: receiver, receiver: sender },
			],
		}).populate({
			path: "messages",
			options: { sort: { created_at: -1 } },
		});

		io.to(sender).emit("message", chats?.messages || []);
		io.to(receiver).emit("message", chats?.messages || []);

		//send all conversation
		const currentChatsSender = await getAllChats(sender);
		const currentChatsReceiver = await getAllChats(receiver);
		io.to(sender).emit("chats", currentChatsSender || []);
		io.to(receiver).emit("chats", currentChatsReceiver || []);
	});

	// Side bar
	socket.on("sidebar", async (data) => {
		const currentChats = await getAllChats(data);
		socket.emit("chats", currentChats);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		onlineUser.delete(user?._id?.toString());
	});
});

export { app, server };
