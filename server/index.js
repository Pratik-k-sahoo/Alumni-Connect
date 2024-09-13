import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/connectDB.js";
import { app, server } from "./socket/index.js";

// Routes import
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import eventRoute from "./routes/eventRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import alumniRoute from "./routes/alumniRoute.js";
import postRoute from "./routes/postRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import communityRoute from "./routes/communityRoute.js";

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	origin: "https://my-alumni.vercel.app/",
	credentials: true,
};
app.use(cors(corsOptions));

// API
// app.get("/", (req, res) => {
// 	res.send("API is running...");
// });
app.get("/", (req, res) => {
	res.send("Hello");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/alumni", alumniRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/feedback", feedbackRoute);
app.use("/api/v1/community", communityRoute);

server.listen(PORT, () => {
	connectDB();
	console.log(`Server running at port: ${PORT}`);
});
