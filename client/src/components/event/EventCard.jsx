import axios from "axios";
import React from "react";
import { EVENT_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { setAdminEvents, setApprovedEvents } from "../../redux/eventSlice";
import { MdDateRange } from "react-icons/md";

const EventCard = ({ event, admin }) => {
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { adminEvents, approvedEvents } = useSelector((state) => state.event);

	const handleAcceptEvent = async () => {
		try {
			dispatch(setLoading(true));
			const response = await axios.get(
				`${EVENT_API_END_POINT}/admin/approve/${event._id}`,
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
			dispatch(setLoading(false));
		}
	};

	const handleDeleteEvent = async () => {
		try {
			dispatch(setLoading(true));
			const response = await axios.delete(
				`${EVENT_API_END_POINT}/admin/delete/${event._id}`,
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
			dispatch(setLoading(false));
		}
	};
	return (
		<div className=" rounded overflow-hidden h-[31rem] max-h-[32rem] w-full shadow-lg m-4 bg-slate-900 text-white flex flex-col justify-between">
			<div>
				<img
					className="w-full h-48 object-cover"
					src={event?.photo}
					alt={event?.title}
				/>
				<div className="px-6 py-4">
					<p className="flex items-center gap-2">
						<MdDateRange size={20} /> :{" "}
						{event?.occur.split("T")?.[0]}
					</p>
					<p>Start Time: {event?.start_time}</p>
					<p>End Time: {event?.end_time}</p>
					<p className="font-semibold text-red-600 mt-2 line-clamp-1">
						{event?.title}
					</p>
					<p className="line-clamp-4 mt-2">{event?.description}</p>
				</div>
			</div>
			<div className="px-7 mb-5 flex justify-evenly">
				{!event?.status && (
					<button
						className="block text-white bg-green-500 hover:bg-blue-600 p-2 rounded-lg"
						onClick={handleAcceptEvent}
					>
						Accept
					</button>
				)}
				{admin && (
					<button
						className="block text-white bg-red-500 hover:bg-blue-600 p-2 rounded-lg"
						onClick={handleDeleteEvent}
					>
						Delete
					</button>
				)}
				{event?.status && (
					<Link to={`/events/${event._id}`}>
						<button className="block font-bold bg-indigo-200 hover:bg-blue-600 text-slate-900 p-2 rounded-lg">
							View Posts
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default EventCard;
