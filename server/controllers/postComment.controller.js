import PostCommentModel from "../models/postCommentModel";

export const createComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.id;
		const content = req.body.content;
		const comment = await PostCommentModel.create({
			content,
			user: userId,
			post: postId,
		});
		if (!comment) {
			return res.status(400).json({
				message: "Failed to create comment",
				success: false,
			});
		}
		return res.status(201).json({
			message: "Comment created successfully",
			success: true,
			comment,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};

export const getAllComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const comments = await PostCommentModel.find({
			post: postId,
		}).populate("user");
        if (!comments) {
            return res.status(404).json({
                message: "No comments found for this post",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            message: "All comments retrieved successfully",
            comments,
        });
	} catch (error) {
		return res.status(500).json({
			message: error.message || error,
			success: false,
		});
	}
};
