import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Header } from "@/components";
import useGetAllCommunity from "@/hooks/useGetAllCommunity";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function CommunityHub() {
	const { community } = useSelector((state) => state.community);
	const { user } = useSelector((state) => state.auth);

	const cardVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<>
			<Header />
			<div className="min-h-[calc(100vh-64px)] bg-[#cbd9f8] py-12 px-4">
				<div className="flex flex-col items-center py-10">
					<h2 className="text-7xl font-bold text-center mb-10">
						Explore Alumni Groups
					</h2>
					<p
						className="text-center text-gray-600"
						style={{ width: "49.13%" }}
					>
						Alumni Groups is the place to find Alumni volunteer-led
						communities and programs worldwide. Discover alumni
						communities and start a conversation or look out for
						upcoming events near where you live or with communities
						important to you.
					</p>
				</div>
				<div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 xl:grid-cols-3">
					{community?.map((item, index) => {
						const [ref, inView] = useInView({
							triggerOnce: true,
							threshold: 0.1,
						});

						return (
							<motion.div
								key={index}
								ref={ref}
								initial="hidden"
								animate={inView ? "visible" : "hidden"}
								variants={cardVariants}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="bg-[#171d32] shadow-md rounded-lg overflow-hidden w-full"
								style={{
									height: "442px",
									margin: "0 auto",
								}}
							>
								<img
									src={item.data}
									alt={item.title}
									className="w-full h-44 object-cover aspect-square"
								/>
								<div className="p-6 flex flex-col justify-between h-56">
									<div>
										<h2 className="text-2xl font-semibold text-white mb-2">
											{item.title}
										</h2>
										<p className="text-white text-base line-clamp-3">
											{item.description}
										</p>
									</div>
									<div className="mt-4">
										<motion.a
											href="#"
											className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 bg-[#cbd9f8] rounded-full shadow-md group"
											whileTap={{ borderRadius: "100%" }}
										>
											<span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#cbd9f8] duration-300 -translate-x-full bg-[#171d32] group-hover:translate-x-0 ease">
												<svg
													className="w-6 h-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M14 5l7 7m0 0l-7 7m7-7H3"
													/>
												</svg>
											</span>
											<span className="absolute flex items-center justify-center w-full h-full text-slate-900 transition-all duration-300 transform group-hover:translate-x-full ease">
												Discover groups &rarr;
											</span>
											<span className="relative invisible">
												Discover groups &rarr;
											</span>
										</motion.a>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
			{(user?.role === "alumni" || user?.role === "admin") && (
				<Link to="add-community">
					<button className="fixed bottom-8 right-8 bg-blue-500 text-black rounded-full p-4 shadow-md hover:bg-blue-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button>
				</Link>
			)}
			<Footer />
		</>
	);
}

export default CommunityHub;
