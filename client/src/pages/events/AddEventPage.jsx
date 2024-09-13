import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import { uploadFile } from "@/helper/uploadFile";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { EVENT_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function AddEventPage({ addEvent }) {
	const [eventData, setEventData] = useState({
		title: "",
		date: "",
		location: "",
		category: "Alumni Events",
		description: "",
		ticketLink: "",
		image: null,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	const handleChange = (e) => {
		setEventData({ ...eventData, [e.target.name]: e.target.value });
	};

	const handleImageUpload = async (e) => {
		try {
			dispatch(setLoading(true));
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				setEventData({ ...eventData, image: reader.result });
			};
			reader.readAsDataURL(file);
			const uploadPhoto = await uploadFile(e.target.files?.[0]);
			setEventData((prev) => ({
				...prev,
				photo: uploadPhoto.secure_url,
			}));
			setEventData((prev) => ({
				...prev,
				image: "",
			}));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				`${EVENT_API_END_POINT}/add`,
				eventData,
				{
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
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="p-8 min-h-screen bg-[#EFE6F5]">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Add Event
				</h1>
				<form
					onSubmit={handleSubmit}
					className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
				>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Event Title:
						</label>
						<input
							type="text"
							name="title"
							value={eventData.title}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Date:
						</label>
						<input
							type="date"
							name="occur"
							value={eventData.occur}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Location:
						</label>
						<input
							type="text"
							name="location"
							value={eventData.location}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Start Time:
						</label>
						<input
							type="text"
							name="start_time"
							value={eventData.start_time}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							End Time:
						</label>
						<input
							type="text"
							name="end_time"
							value={eventData.end_time}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Event Type:
						</label>
						<select
							name="event_type"
							value={eventData.event_type}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						>
							<option value="Alumni">Alumni Events</option>
							<option value="Student">Student Events</option>
							<option value="Community">Community Events</option>
						</select>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Description:
						</label>
						<textarea
							name="description"
							value={eventData.description}
							onChange={handleChange}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2 font-semibold">
							Upload Event Image:
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					{eventData.image && (
						<div className="mb-4">
							<img
								src={eventData?.photo || eventData.image}
								alt="Event Preview"
								className="w-full h-48 object-cover rounded-lg"
							/>
						</div>
					)}
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-300"
					>
						{loading ? <LoadingOutlined /> : "Add Event"}
					</button>
				</form>
			</div>
			<Footer />
		</>
	);
}

export default AddEventPage;
