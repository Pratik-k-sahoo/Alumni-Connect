import { CommunityModel } from "../models/communityModel.js";

export const addCommunity = async (req, res) => {
	try {
		if (req.role === "admin" || req.role === "alumni") {
			const { title, description, data } = req.body;
			if (!title || !description || !data) {
				return res.status(400).json({
					message: "Title, description and image are required",
					success: false,
				});
			}
			const community = await CommunityModel.create({
				title,
				description,
				data,
				created_by: req.id,
			});
			if (!community) {
				return res.status(400).json({
					message: "Failed to create community",
					success: false,
				});
			}
			return res.status(201).json({
				success: true,
				message: "Community created successfully",
				community,
			});
		} else {
			return res.status(401).json({
				message: "Unauthorized " + req.role,
				success: false,
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAllCommunty = async (req, res) => {
	try {
		const communities = await CommunityModel.find().populate(
			"created_by"
			// "created_by communityPost"
		);
		if (!communities) {
			return res.status(404).json({
				message: "No communities found",
				success: false,
			});
		}
		return res.status(200).json({
			success: true,
			message: "All communities retrieved",
			communities,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const updateCommunity = async (req, res) => {
	try {
		const userId = req.id;
		const communityId = req.params.id;
		const community = await CommunityModel.findById(communityId).populate(
			"created_by"
		);
		if (!community) {
			return res.status(404).json({
				message: "Community not found",
				success: false,
			});
		}
		if (community.created_by !== userId) {
			return res.status(401).json({
				message: "Unauthorized",
				success: false,
			});
		}
		const { title, description } = req.body;
		community.title = title.length > 0 ? title : community.title;
		community.description =
			description.length > 0 ? description : community.description;
		await community.save();
		return res.status(200).json({
			success: true,
			message: "Community updated successfully",
			community,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};
