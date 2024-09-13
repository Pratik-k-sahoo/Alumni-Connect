import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import EventCard from "@/components/event/EventCard";
import { useSelector } from "react-redux";
import useGetAllApprovedEvents from "@/hooks/useGetAllApprovedEvents";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Events = () => {
	useGetAllApprovedEvents();
	const { approvedEvents } = useSelector((state) => state.event);
	const [filterEvents, setFilterEvents] = useState(
		approvedEvents.slice(0, 4)
	);
	const [filter, setFilter] = useState(filterEvents);
	const [search, setSearch] = useState("");
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		const filtered =
			filterEvents?.length >= 0 &&
			filterEvents?.filter((events) => {
				if (!events) return true;
				return (
					events?.title
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.description
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.localtion
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.start_time
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.end_time
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.created_by.fullname
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.event_type
						?.toLowerCase()
						.includes(search.trim().toLowerCase()) ||
					events?.occur
						?.toLowerCase()
						.includes(search.trim().toLowerCase())
				);
			});
		setFilter(filtered);
	}, [filterEvents, search]);

	const handleGetMoreEvent = () => {
		setFilterEvents((prev) => approvedEvents.slice(0, prev.length + 4));
	};

	return (
		<>  
            <Header />
			<div className="mx-auto p-12 bg-indigo-200 w-full min-h-[calc(100vh-64px)] ">
				<div className="flex justify-between items-center mb-6 flex-wrap gap-3">
					<input
						type="text"
						placeholder="search"
						className="border p-2 rounded"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<input
						type="date"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border p-2 rounded"
					/>
					{user && (
						<div className="flex gap-3 flex-wrap">
							{user?.role === "admin" && (
								<Link to={"admin/approve"}>
									<button className="bg-green-500 text-white px-4 py-2 rounded">
										Approve Event
									</button>
								</Link>
							)}
							{(user?.role === "admin" ||
								user?.role === "alumni") && (
								<Link to={"add-post"}>
									<button className="bg-green-500 text-white px-4 py-2 rounded">
										Post
									</button>
								</Link>
							)}
							<Link to={"add-event"}>
								<button className="bg-green-500 text-white px-4 py-2 rounded">
									Submit Event
								</button>
							</Link>
						</div>
					)}
				</div>
				<h1 className="text-3xl font-bold mb-6">
					Events from Aug 23rd
				</h1>
				<div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 -m-4">
					{filter?.map((event, index) => (
						<Link to={event._id} key={index}>
							<EventCard event={event} />
						</Link>
					))}
				</div>
				{filterEvents.length < approvedEvents.length && (
					<div className="text-center mt-6">
						<button
							className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
							onClick={handleGetMoreEvent}
						>
							Load More Events
						</button>
					</div>
				)}
			</div>
            <Footer />
		</>
	);
};

export default Events;
