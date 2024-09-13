import { ChatModel } from "../models/chatModel.js";

const getAllChats = async (data) => {
	const currentChats = await ChatModel.find({
		$or: [{ sender: data }, { receiver: data }],
	})
		.populate("messages sender receiver")
		.sort({ updatedAt: -1 });

	return currentChats;
};

export default getAllChats;
