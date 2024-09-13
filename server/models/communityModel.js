import { Schema, model } from "mongoose";

const communitySchema = new Schema(
	{
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
            required: true
		},
        data: {
            type: String,
            required: true
        },
		description: {
			type: String,
		},
        communityPost: [
            {
                type: Schema.Types.ObjectId,
                ref: "CommunityPost",
            }
        ]
	},
	{ timestamps: true }
);

export const CommunityModel = model("Community", communitySchema);
