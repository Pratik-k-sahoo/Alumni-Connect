import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
	addAlumni,
	getAllUnapproved,
	getAlumni,
	getAlumniById,
	updateAlumniStatus,
} from "../controllers/alumni.controller.js";

const router = Router();

router.route("/:id/register").post(addAlumni);
router.route("/:id").get(getAlumniById);
router.route("/").get(getAlumni);
router.route("/get/unapproved").get(isAuthenticated, getAllUnapproved);
router.route("/approve/:id").put(isAuthenticated, updateAlumniStatus);

export default router;
