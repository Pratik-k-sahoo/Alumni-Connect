import { SuccessStoriesModel } from "../models/successStoriesModel";

export const createStory = async (req, res) => {
    try {
        const {title, description} = req.body;
        const story = await SuccessStoriesModel.create({
			title,
			description,
			user: req.id,
		});
        if (!story) {
            return res.status(400).json({
                message: "Failed to create success story",
                success: false,
            });
        }
        return res.status(201).json({
            message: "Success story created successfully",
            success: true,
            story,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
        })
    }
}

export const getAllStory = async (req, res) => {
    try {
        const stories = await SuccessStoriesModel.find().populate("user");
        if (!stories) {
            return res.status(404).json({
                message: "No success stories found",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            stories,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
        })
    }
}