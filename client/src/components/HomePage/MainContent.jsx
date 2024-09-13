import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Fade} from "react-awesome-reveal";

function MainContent({ events }) {
    	const [currentEvent, setCurrentEvent] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setCurrentEvent((prevIndex) =>
					prevIndex === events.length - 1 ? 0 : prevIndex + 1
				);
			}, 3000);
			return () => clearInterval(interval);
		}, [events.length]);
	return (
		<main className="max-w-full mx-auto p-8 bg-indigo-200">
				<Fade>
				<div className="flex gap-8 flex-wrap items-center justify-center">
					{/* Sidebar */}

					<div className="card bg-primary text-primary-content lg:w-1/3 w-2/3 h-[25rem] lg:h-full">
						<div className="card-body">
							<h1 className="text-3xl font-bold flex justify-center text-yellow-400 pb-3 ">
								Events
							</h1>
							<div className="carousel rounded-box h-96 overflow-hidden relative">
								<div
									className="absolute top-0 left-0 h-full w-full transition-transform duration-1000 ease-in-out"
									style={{
										transform: `translateY(-${
											currentEvent * 100
										}%)`,
									}}
								>
									{events.map((slide, index) => (
										<div
											key={index}
											className="carousel-item h-full w-full flex-shrink-0"
										>
											<div className="relative h-full w-full">
												<img
													src={slide.photo}
													alt={slide.title}
													className="z-0 h-full w-full rounded-md object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
												<div className="absolute bottom-4 left-4 text-left">
													<h1 className="text-lg font-semibold text-white">
														{slide.title}
													</h1>
													<p className="mt-2 text-sm text-gray-300">
														{slide.description}
													</p>
													<Link to={"/events"}>
														<button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
															Show more →
														</button>
													</Link>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Main Section */}
					<div className="lg:w-2/4 w-3/4 p-10">
						<h1 className="flex justify-center text-4xl font-bold mb-20 text-gray-800 ">
							Alumni Networking and Engagement
						</h1>
						<div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 content-center">
							<div className="flex items-start">
								<div className="flex-shrink-0 bg-[#283460] text-indigo-200 rounded-full p-4 mr-4">
									<span className="text-2xl font-semibold">
										1
									</span>
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										Search and Connect
									</h2>
									<p className="text-gray-600">
										Alumni can search and connect with
										fellow alumni based on various criteria,
										such as program, year of graduation, or
										career field.
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="flex-shrink-0 bg-[#283460] text-indigo-200 rounded-full p-4 mr-4">
									<span className="text-2xl font-semibold">
										2
									</span>
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										Discussion Forums
									</h2>
									<p className="text-gray-600">
										Interactive forums allow alumni to
										engage in discussions, share insights,
										and build relationships around shared
										interests.
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="flex-shrink-0 bg-[#283460] text-indigo-200 rounded-full p-4 mr-4">
									<span className="text-2xl font-semibold">
										3
									</span>
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										Club Creation
									</h2>
									<p className="text-gray-600">
										Alumni can create and join groups based
										on shared interests, such as
										professional sectors, hobbies, or
										geographic locations.
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="flex-shrink-0 bg-[#283460] text-indigo-200 rounded-full p-4 mr-4">
									<span className="text-2xl font-semibold">
										4
									</span>
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										News and Updates
									</h2>
									<p className="text-gray-600">
										The platform keeps alumni informed with
										relevant news, events, and updates from
										the college and the alumni community.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
		</Fade>
			</main>
	);
}

export default MainContent;
