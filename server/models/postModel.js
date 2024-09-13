import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		content_type: {
			type: String,
			required: true,
			enum: ["image", "video"],
		},
		data: {
			type: String,
			default: "",
		},
		uploadedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post-Comment",
			},
		],
	},
	{ timestamps: true }
);

const PostModel = model("Post", postSchema);

export default PostModel;
