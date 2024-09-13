import { FeedbackModel } from "../models/feedbackModel.js";

export const addFeedback = async (req, res) => {
	try {
		const userId = req.id;
		const { message } = req.body;
		const feedback = await FeedbackModel.create({
			content: message,
			created_by: userId,
		});
		if (!feedback) {
			return res.status(400).json({
				message: "Failed to add feedback",
				success: false,
			});
		}
		return res.status(201).json({
			message: "Feedback added successfully",
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getFeedbacks = async (req, res) => {
	try {
		const feedbacks = await FeedbackModel.find().populate("created_by");
		if (!feedbacks) {
			return res.status(404).json({
				message: "No feedbacks found",
				success: false,
			});
		}
		return res.status(200).json({
			success: true,
			message: "All feedbacks retrieved",
			feedbacks,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};
