import { NewsModel } from "../models/newsModel";

export const postNews = async (req, res) => {
	try {
		const { title, content } = req.body;
		const news = await NewsModel.create({
			title,
			content,
			created_by: req.user._id,
		});
		if (!news) {
			return res.status(400).json({
				success: false,
				message: "Something went wrong",
			});
		}
		return res.status(201).json({
			success: true,
			message: "News posted successfully",
			news,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAllNews = async (req, res) => {
	try {
		const news = await NewsModel.find()
			.populate("created_by")
			.sort({ createdAt: -1 });
		if (!news) {
			return res.status(404).json({
				success: false,
				message: "No news found",
			});
		}
		return res
			.status(200)
			.json({ success: true, message: "All news retrieved", news });
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const updateNews = async (req, res) => {
	try {
		const { title, content } = req.body;
		const news = await NewsModel.findById(req.params.id).populate(
			"created_by"
		);
		if (!news) {
			return res.status(404).json({
				success: false,
				message: "News not found",
			});
		}
		if (news?.created_by !== req.id) {
			return res.status(401).json({
				success: false,
				message: "Unauthorised",
			});
		}

		news.title = title.length > 0 ? title : news.title;
		news.content = content.length > 0 ? content : news.content;
		await news.save();
		return res.status(200).json({
			success: true,
			message: "News updated successfully",
			news,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};
