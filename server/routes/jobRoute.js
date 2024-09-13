import { Router } from "express";
import {
	getAdminJobs,
	getAllJobs,
	getJobById,
	postJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/").get(getAllJobs);
router.route("/:id").get(getJobById);
router.route("/add-job").post(isAuthenticated, postJob);
router.route("/admin/job").get(isAuthenticated, getAdminJobs);

export default router;
