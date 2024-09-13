import { Schema, model } from "mongoose";

const eventFeedbackSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        }
	},
	{ timestamps: true }
);

export const EventFeedbackModel = model("EventFeedback", eventFeedbackSchema);
