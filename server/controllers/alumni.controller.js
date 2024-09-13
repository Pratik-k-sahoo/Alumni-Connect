import { AlumniModel } from "../models/alumniModel.js";
import UserModel from "../models/userModel.js";

export const addAlumni = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await UserModel.findById(userId);

		if (user.role !== "alumni") {
			return res.status(401).json({
				message: "Unauthorized to add alumni",
				success: false,
			});
		}
		const checkAlumniAvailable = await AlumniModel.findOne({
			user: user._id,
		});
		if (checkAlumniAvailable) {
			return res.status(400).json({
				message: "Alumni already exists",
				success: false,
			});
		}

		const { achievements, linkedin, github } = req.body;

		const achievementArray = achievements?.split(", ");
		const alumni = await AlumniModel.create({
			user: user._id,
			achievements: achievementArray,
			socials: {
				linkedin: linkedin || "",
				github: github || "",
			},
		});

		if (!alumni) {
			return res.status(400).json({
				message: "Failed to add alumni",
				success: false,
			});
		}
		return res.status(201).json({
			message: "Alumni added successfully",
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAlumni = async (req, res) => {
	try {
		const alumni = await AlumniModel.find({ status: "true" }).populate(
			"user"
		);
		if (!alumni) {
			return res.status(404).json({
				message: "No alumni found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Alumni found successfully",
			success: true,
			alumni,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const getAlumniById = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await UserModel.findById(userId);
		const alumni = await AlumniModel.findOne({ user: user._id });
		if (!alumni) {
			return res.status(404).json({
				message: "No alumni found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Alumni found successfully",
			success: true,
			alumni,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const getAllUnapproved = async (req, res) => {
	try {
		const alumniUnapproved = await AlumniModel.find({
			status: "pending",
		}).populate("user");
		if (!alumniUnapproved) {
			return res.status(404).json({
				message: "No unapproved alumni found",
				success: false,
			});
		}
		console.log(alumniUnapproved);
		return res.status(200).json({
			message: "Unapproved alumni retrieved successfully",
			success: true,
			alumniUnapproved,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const updateAlumniStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const id = req.params.id;
		console.log(id);
		const alumni = await AlumniModel.findOne({ user: id }).populate("user");
		if (!alumni) {
			return res.status(404).json({
				message: "No unapproved alumni found",
				success: false,
			});
		}
		alumni.status = status;
		await alumni.save();
		console.log(alumni);
		return res.status(200).json({
			message: "Status of alumni updated successfully successfully",
			success: true,
            alumni,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};
