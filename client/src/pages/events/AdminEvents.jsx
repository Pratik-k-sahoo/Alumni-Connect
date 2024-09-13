import React, { useState } from "react";
import { Header } from "@/components";
import useGetAllAdminEvents from "@/hooks/useGetAllAdminEvents";
import { useSelector } from "react-redux";
import EventCard from "@/components/event/EventCard";
import Footer from "../../components/Footer/Footer";

const AdminEvents = () => {
	useGetAllAdminEvents();
	const { adminEvents } = useSelector((state) => state.event);
	const [filterEvents, setFilterEvents] = useState(adminEvents.slice(0, 4));
	let isStatusCheckAvailable = false;

	const handleGetMoreEvent = () => {
		setFilterEvents((prev) => adminEvents.slice(0, prev.length + 4));
	};
	return (
		<>
			<Header />
			<div className="container mx-auto p-6 ">
				<div className="flex justify-between items-center mb-6">
					<input
						type="text"
						placeholder="search"
						className="border p-2 rounded"
					/>
					<input type="date" className="border p-2 rounded" />
				</div>
				{filterEvents?.map((event) => {
					if (!event.status) return (isStatusCheckAvailable = true);
				})}
				{isStatusCheckAvailable && (
					<h2 className="text-3xl font-bold mb-6">Pending..</h2>
				)}
				<div className="grid grid-cols-4 gap-6 -m-4">
					{filterEvents?.map(
						(event, index) =>
							!event.status && (
								<EventCard
									admin={"admin"}
									key={index}
									event={event}
								/>
							)
					)}
				</div>
				<h2 className="text-3xl font-bold mb-6">Approved</h2>
				<div className="grid grid-cols-4 gap-6 -m-4">
					{filterEvents?.map(
						(event, index) =>
							event.status && (
								<EventCard
									admin={"admin"}
									key={index}
									event={event}
								/>
							)
					)}
				</div>
				<div className="text-center mt-6">
					<button
						className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
						onClick={handleGetMoreEvent}
					>
						Load More Events
					</button>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AdminEvents;
