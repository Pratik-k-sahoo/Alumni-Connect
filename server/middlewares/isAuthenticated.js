import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({
				message: "User not authenticated with token",
				success: false,
			});
		}

		const decode = await jwt.verify(token, process.env.SECRET_KEY);
		if (!decode) {
			return res.status(403).json({
				message: "Invalid token",
				success: false,
			});
		}

        const user = await UserModel.findById(decode.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
		req.id = decode.userId;
		req.role = decode.role;
		next();
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export default isAuthenticated;
