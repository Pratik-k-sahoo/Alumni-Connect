import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { uploadFile } from "../../helper/uploadFile";
import Loading from "../../components/newChats/Loading";
import axios from "axios";
import { POST_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const AddPost = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading } = useSelector((state) => state.auth);
	const { approvedEvents } = useSelector((state) => state.event);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		content_type: "",
		data: "",
		eventId: "",
	});

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = async (e) => {
		try {
			dispatch(setLoading(true));
			const uploadPhoto = await uploadFile(e.target.files?.[0]);
			setFormData((prev) => ({
				...prev,
				data: uploadPhoto.secure_url,
			}));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleSubmit = async (e) => {
		dispatch(setLoading(true));
		e.preventDefault();
		try {
			console.log(formData);
			const response = await axios.post(
				`${POST_API_END_POINT}/add`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast(response.data.message);
				navigate("/events");
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className="min-h-[calc(100vh-64px)] bg-[#cbd9f8] py-12 px-4">
			<div className="w-full  max-w-screen-md mx-auto p-4 md:p-8">
				<h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
					Add New Post
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleEventChange}
								placeholder="Enter title"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="description">Description</Label>
							<Input
								id="description"
								name="description"
								value={formData.description}
								onChange={handleEventChange}
								placeholder="Enter description"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="content_type">Content Type</Label>
							<Select
								onValueChange={(value) =>
									setFormData({
										...formData,
										content_type: value,
									})
								}
								value={formData.content_type}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Content Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="image">Image</SelectItem>
									<SelectItem value="video">Video</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="photo">Photo</Label>
							<Input
								id="photo"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								disabled={formData.content_type === "video"}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="video">Video</Label>
							<Input
								id="video"
								type="file"
								accept="video/*"
								onChange={handleFileChange}
								disabled={formData.content_type === "image"}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="event">Event</Label>
							<Select
								onValueChange={(value) =>
									setFormData({
										...formData,
										eventId: value,
									})
								}
								value={formData.eventId}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Event" />
								</SelectTrigger>
								<SelectContent>
									{approvedEvents.map((event) => (
										<SelectItem
											value={event._id}
											key={event._id}
										>
											{event.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<Button type="submit" className="w-full">
						{loading ? <Loading /> : "Submit"}
					</Button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default AddPost;
