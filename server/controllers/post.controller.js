import { EventModel } from "../models/eventModel.js";
import PostModel from "../models/postModel.js";

export const createPost = async (req, res) => {
	try {
		const userId = req.id;
		const { title, description, content_type, eventId, data } = req.body;
		console.log(title, content_type, description, data);
		if (!title || !content_type || !eventId || !data) {
			return res.status(400).json({
				message: "Something is missing",
				success: false,
			});
		}

		const event = await EventModel.findById(eventId).populate(
			"posts created_by"
		);
		if (!event) {
			return res.status(404).json({
				message: "Event not found",
				success: false,
			});
		}
		const post = await PostModel.create({
			title,
			description,
			content_type,
			data,
			uploadedBy: userId,
			event: eventId,
		});
		if (!post) {
			return res.status(400).json({
				message: "Failed to create post",
				success: false,
			});
		}
		event.posts.push(post._id);
		await event.save();
		return res.status(201).json({
			success: true,
			message: "Post created successfully",
			post,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const getAllPostsByEvent = async (req, res) => {
	try {
		const posts = await PostModel.find({ event: req.params.id }).populate({
			path: "uploadedBy event",
		});
		if (!posts) {
			return res.status(404).json({
				message: "No posts found",
				success: false,
			});
		}
		return res.status(200).json({
			success: true,
			message: "All posts retrieved",
			posts,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};
