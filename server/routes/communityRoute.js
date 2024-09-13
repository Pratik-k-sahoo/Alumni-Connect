import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  addCommunity,
  getAllCommunty,
} from "../controllers/community.controller.js";

const router = Router();

router.route("/add").post(isAuthenticated, addCommunity);
router.route("/").get(getAllCommunty);

export default router;
