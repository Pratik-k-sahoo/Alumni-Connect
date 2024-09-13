import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
	addFeedback,
	getFeedbacks,
} from "../controllers/feedback.controller.js";

const router = Router();

router.route("/add").post(isAuthenticated, addFeedback);
router.route("/").get(getFeedbacks);
export default router;
