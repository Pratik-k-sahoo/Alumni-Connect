import { Router } from "express";
import {
	login,
	logout,
	register,
	searchUser,
	updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.post("/chat/search", searchUser);


export default router;
