import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose
			.connect(process.env.MONGODB_URL)
			.then(() => console.log("DATABASE CONNECTED"))
			.catch((error) => console.log(error));
	} catch (error) {
		console.log(error);
	}
};
