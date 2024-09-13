import { EventModel } from "../models/eventModel.js";
import UserModel from "../models/userModel.js";

export const addEvent = async (req, res) => {
	try {
		const userId = req.id;
		console.log(req.role);
		if (req.role === "alumni" || req.role === "admin") {
			const {
				event_type,
				title,
				photo,
				description,
				start_time,
				end_time,
				location,
			} = req.body;
			const occur = new Date(req.body.occur);
            console.log(occur);            

			if (
				!event_type ||
				!title ||
				!occur ||
				!description ||
				!start_time ||
				!end_time ||
				!location
			) {
				return res.status(400).json({
					message: "All fields are required",
					success: false,
				});
			}

			const event = await EventModel.create({
				event_type,
				title,
				photo,
				occur,
				description,
				start_time,
				end_time,
				location,
				created_by: userId,
			});

			if (!event) {
				return res.status(400).json({
					message: "Failed to create event",
					success: false,
				});
			}
			return res.status(201).json({
				success: true,
				message: "Event created successfully",
				event,
			});
		} else {
			return res.status(403).json({
				message: "Unauthorized to create event",
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

export const updateEvent = async (req, res) => {
	try {
		const userId = req.id;
		const eventId = req.params.id;
		const event = await EventModel.findById(eventId).populate("created_by");
		if (!event) {
			return res.status(404).json({
				message: "Event not found",
				success: false,
			});
		}

		if (event.created_by._id.toString() !== userId) {
			return res.status(401).json({
				message: "Unauthorized to update event",
				success: false,
			});
		}
		const {
			event_type,
			title,
			photo,
			description,
			start_time,
			end_time,
			location,
		} = req.body;

		event.event_type =
			event_type?.length > 0 ? event_type : event.event_type;
		event.title = title?.length > 0 ? title : event.title;
		event.description =
			description?.length > 0 ? description : event.description;
		event.start_time =
			start_time?.length > 0 ? start_time : event.start_time;
		event.end_time = end_time?.length > 0 ? end_time : event.end_time;
		event.location = location?.length > 0 ? location : event.location;
		event.photo = photo?.length > 0 ? photo : event.photo;

		await event.save();
		return res.status(200).json({
			success: true,
			message: "Event updated successfully",
			event,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAllEvents = async (req, res) => {
	try {
		const events = await EventModel.find()
			.populate("created_by")
			.sort({ createdAt: -1 });
		if (!events) {
			return res.status(404).json({
				message: "No events found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "All events",
			success: true,
			events,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getAllApprovedEvents = async (req, res) => {
	try {
		const events = await EventModel.find({
			status: true,
		})
			.populate("created_by")
			.sort({ createdAt: -1 });
		// }).populate("created_by posts feedbacks");
		if (!events) {
			return res.status(404).json({
				message: "No events found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "All approved events",
			success: true,
			events,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const updateEventStatus = async (req, res) => {
	try {
		const eventId = req.params.id;
		console.log(req.role);
		if (req.role !== "admin") {
			return res.status(403).json({
				message: "Unauthorized to update event status",
				success: false,
			});
		}
		const event = await EventModel.findByIdAndUpdate(eventId, {
			status: true,
		}).populate("created_by");
		// }).populate("created_by posts feedbacks");
		if (!event) {
			return res.status(404).json({
				message: "No events found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Event Approved",
			success: true,
			event,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const deleteEvent = async (req, res) => {
	try {
		const eventId = req.params.id;
		if (req.role !== "admin") {
			return res.status(403).json({
				message: "Unauthorized to delete event",
				success: false,
			});
		}
		const event = await EventModel.findByIdAndDelete(eventId);
		if (!event) {
			return res.status(404).json({
				message: "Event not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Event deleted successfully",
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};

export const getEventById = async (req, res) => {
	try {
		const eventId = req.params.id;
		const event = await EventModel.findById(eventId).populate(
			"created_by"
			// "created_by posts feedback"
		);
		if (!event) {
			return res.status(404).json({
				message: "Event not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Event details",
			success: true,
			event,
		});
	} catch (error) {
		return res.status(500).json({
			message: error?.message || error,
			success: false,
		});
	}
};
