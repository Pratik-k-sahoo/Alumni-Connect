import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
	addEvent,
	deleteEvent,
	getAllApprovedEvents,
	getAllEvents,
	getEventById,
	updateEvent,
	updateEventStatus,
} from "../controllers/event.controller.js";

const router = Router();

router.route("/add").post(isAuthenticated, addEvent);
router.route("/").get(getAllApprovedEvents);
router.route("/get/:id").get(isAuthenticated, getEventById);
router.route("/:id").put(isAuthenticated, updateEvent);
router.route("/admin/").get(isAuthenticated, getAllEvents);
router.route("/admin/approve/:id").get(isAuthenticated, updateEventStatus);
router.route("/admin/delete/:id").delete(isAuthenticated, deleteEvent);

export default router;
