import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getUserDetailsFromToken = async (token) => {
	try {
		if (!token) {
			return {
				status: 404,
				message: "Unauthorized",
				success: false,
			};
		}
		const payload = await jwt.verify(token, process.env.SECRET_KEY);
		const user = await UserModel.findById(payload.userId).select(
			"-password"
		);
		if (!user) {
			return {
				status: 401,
				message: "User not found",
				success: false,
			};
		}

		return {
			status: 200,
			message: "User details retrieved successfully",
			success: true,
			user,
		};
	} catch (error) {
		return {
			status: 500,
			message: "Unauthorised",
			success: false,
		};
	}
};

