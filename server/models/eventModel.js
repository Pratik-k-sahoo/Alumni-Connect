import { Schema, model } from "mongoose";

const eventSchema = new Schema(
	{
		event_type: {
			type: String,
			required: true,
			enum: ["Alumni", "Student", "Community"],
		},
		title: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: "",
		},
		description: {
			type: String,
		},
		location: {
			type: String,
			required: true,
		},
		start_time: {
			type: String,
			required: true,
		},
		end_time: {
			type: String,
			required: true,
		},
        occur: {
            type: Date,
            required: true
        },
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		feedbacks: [
			{
				type: Schema.Types.ObjectId,
				ref: "EventFeedbackk",
			},
		],
		status: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const EventModel = model("Event", eventSchema);
