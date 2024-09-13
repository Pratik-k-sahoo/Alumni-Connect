import { Schema, model } from "mongoose";

const alumniSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		achievements: [
			{
				type: String,
			},
		],
		socials: {
			linkedin: {
				type: String,
			},
			github: {
				type: String,
			},
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
);

export const AlumniModel = model("Alumni", alumniSchema);
