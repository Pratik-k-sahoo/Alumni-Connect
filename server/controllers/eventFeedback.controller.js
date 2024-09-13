import { EventFeedbackModel } from "../models/eventFeedBackModel";
import { EventModel } from "../models/eventModel";
import UserModel from "../models/userModel.js";

export const addFeedback = async (req, res) => {
	try {
		const userId = req.id;
        const user = await UserModel.findById(userId);
		const eventId = req.params.id;
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
                success: false,
            });
        }

		const { title, content, rating } = req.body;
		const feedback = await EventFeedbackModel.create({
			created_by: userId,
			title,
			content,
			rating,
			event: eventId,
		});
		if (!feedback) {
			return res.status(400).json({
				message: "Failed to add feedback",
				success: false,
			});
		}

        event.rating = (event.rating + rating) / event.feedbacks.length + 1;
        event.feedbacks.push(feedback);
        await event.save();

		return res.status(201).json({
			message: "Feedback added successfully",
			success: true,
			feedback
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

