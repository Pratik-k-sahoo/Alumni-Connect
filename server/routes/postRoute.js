import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createPost, getAllPostsByEvent } from "../controllers/post.controller.js";
const router = Router();

router.route("/add").post(isAuthenticated, createPost);
router.route("/:id").get(isAuthenticated, getAllPostsByEvent);

export default router;
