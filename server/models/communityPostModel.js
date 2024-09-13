import { Schema, model } from "mongoose";

const communityPostSchema = new Schema(
	{
		created_by: {
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
		community: {
			type: Schema.Types.ObjectId,
			ref: "Community",
			required: true,
		},
		data: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const CommunityPostModel = model("CommunityPost", communityPostSchema);
