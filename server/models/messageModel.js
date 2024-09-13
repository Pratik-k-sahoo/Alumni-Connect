import { Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		text: {
			type: String,
		},
		imageUrl: {
			type: String,
		},
		videoUrl: {
			type: String,
		},
		seen: {
			type: Boolean,
			default: false,
		},
		messageBy: {
			type: Schema.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export const MessageModel = model("Message", messageSchema);
