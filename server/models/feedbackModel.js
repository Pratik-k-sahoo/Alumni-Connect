import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const FeedbackModel = model("Feedback", feedbackSchema);
