import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
	{
		content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
	},
	{ timestamps: true }
);

const PostCommentModel = model("PostComment", commentSchema);

export default PostCommentModel;
