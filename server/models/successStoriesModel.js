import { Schema, model } from "mongoose";

const successStoriesSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const SuccessStoriesModel = model(
	"SuccessStories",
	successStoriesSchema
);
