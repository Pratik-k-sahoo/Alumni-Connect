import { Schema, model } from "mongoose";

const chatSchema = new Schema(
	{
		sender: {
			type: Schema.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: Schema.ObjectId,
			ref: "User",
			required: true,
		},
		messages: [
			{
				type: Schema.ObjectId,
				ref: "Message",
			},
		],
	},
	{ timestamps: true }
);

export const ChatModel = model("Chat", chatSchema);
