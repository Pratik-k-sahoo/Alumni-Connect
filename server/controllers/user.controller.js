import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AlumniModel } from "../models/alumniModel.js";

export const register = async (req, res) => {
	try {
		const {
			fullname,
			email,
			role,
			company,
			bio,
			redgNo,
			graduation_year,
			profileImage,
            programme,
            department,
			resume,
		} = req.body;
		let password = req.body.password;

		if (
			!fullname ||
			!email ||
			!password ||
			!role ||
			!bio ||
			!redgNo ||
			!graduation_year ||
            !programme ||
            !department
		) {
			return res.status(400).json({
				message: "Something is missing.",
				success: false,
			});
		}

		let user = await UserModel.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "Email already registered",
				success: false,
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
        const branch = programme + " " + department;
		user = await UserModel.create({
			fullname,
			email,
			password: hashedPassword,
			role,
			graduation_year,
			branch,
			profile: {
				profileImage,
				bio,
				redgNo,
				company,
				resume,
			},
		});

		return res.status(201).json({
			message: "Registration successful",
			success: true,
			userId: user._id,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, role } = req.body;

		let password = req.body.password;

		if (!email || !password) {
			return res.status(400).json({
				message: "Something is missing.",
				success: false,
			});
		}

		let user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({
				message: "Incorrect username or password",
				success: false,
			});
		}

		if (user.role !== role) {
			return res.status(404).json({
				message: "No user found with this role",
				success: false,
			});
		}

		const matchedPassword = bcrypt.compare(password, user.password);
		if (!matchedPassword) {
			return res.status(404).json({
				message: "Incorrect username or password",
				success: false,
			});
		}

		let alumni;
		if (user.role === "alumni") {
			alumni = await AlumniModel.findOne({ user: user._id });
		}

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			graduation_year: user.graduation_year,
			role: user.role,
			branch: user.branch,
			profile: user.profile,
		};

		const tokenData = {
			userId: user._id,
			role: user.role,
		};

		const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		const cookieOptions = {
			https: true,
			secure: true,
			sameSite: "None",
			domain: "my-alumni.vercel.app",
		};

		return res
			.status(200)
			.cookie("token", token, cookieOptions)
			.json({
				message: `Welcome back ${user.fullname}`,
				success: true,
				user,
				alumni,
			});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const logout = async (req, res) => {
	try {
		return res
			.status(200)
			.cookie("token", "", {
				maxAge: 0,
			})
			.json({
				message: "Logged out successfully",
				success: true,
			});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const {
			fullname,
			graduation_year,
			branch,
			bio,
			company,
			profileImage,
			achievements,
			linkedin,
			github,
            resume
		} = req.body;

		const userId = req.id; //middleware authentication
		let user = await UserModel.findById(userId);

		if (!user) {
			return res.status(400).json({
				message: "User not found",
				success: false,
			});
		}

		user.fullname = fullname?.length > 0 ? fullname : user.fullname;
		user.profile.bio = bio?.length > 0 ? bio : user.profile.bio;
		user.graduation_year =
			graduation_year > 0 ? graduation_year : user.graduation_year;
		user.branch = branch?.length > 0 ? branch : user.branch;
		user.profile.company =
			company?.length > 0 ? company : user.profile.company;
		user.profile.profileImage =
			profileImage?.length > 0 ? profileImage : user.profile.profileImage;
		user.profile.resume = resume?.length > 0 ? resume : user.profile.resume;
		await user.save();

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			role: user.role,
			profile: user.profile,
			graduation_year: user.graduation_year,
			branch: user.branch,
		};

		if (achievements || linkedin || github) {
			let alumni = await AlumniModel.findOne({ user: user._id });
			if (!alumni) {
				alumni = await AlumniModel.create({
					user: user._id,
					achievements:
						achievements?.length > 0
							? achievements.split(", ")
							: [],
					socials: {
						linkedin: linkedin || "",
						github: github || "",
					},
				});
			} else {
				alumni.achievements =
					achievements?.length > 0
						? achievements.split(", ")
						: alumni.achievements;
				alumni.socials.linkedin =
					linkedin?.length > 0 ? linkedin : alumni.socials.linkedin;
				alumni.socials.github =
					github?.length > 0 ? github : alumni.socials.github;
				await alumni.save();
			}
			return res.status(200).json({
				message: "Profile and alumni details updated successfully",
				success: true,
				user,
				alumni,
			});
		}

		return res.status(200).json({
			message: "Profile updated successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

export const searchUser = async (req, res) => {
	try {
		const { search } = req.body;
		const query = new RegExp(search, "i", "g");
		const users = await UserModel.find({
			$or: [{ name: query }, { email: query }],
		});

		return res.status(200).json({
			message: "Users found",
			success: true,
			users,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

