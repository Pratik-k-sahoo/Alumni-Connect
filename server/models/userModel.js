import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["student", "alumni", "admin"],
			default: "alumni",
		},
		graduation_year: {
			type: Number,
			required: true,
		},
		branch: {
			type: String,
		},
		profile: {
			bio: { type: String },
			company: { type: String },
			profileImage: { type: String, default: "" },
			redgNo: {
				type: String,
			},
			resume: { type: String, default: "" },
		},
	},
	{ timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
