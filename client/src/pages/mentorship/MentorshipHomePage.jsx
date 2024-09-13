import React from "react";
import { Link } from "react-router-dom";
import RatingComponent from "./RatingComponent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const MentorshipHomePage = () => {
	const handleRatingSelect = (rating) => {
		console.log(`Selected Rating: ${rating}`);
	};
	return (
		<>
			<Header />
			<div className="w-full mx-auto p-6 bg-indigo-200">
				<div className="max-w-4xl mx-auto p-6">
					{/* Header */}
					<h1 className="text-3xl font-bold text-center mb-6">
						Alumni Mentorship Program
					</h1>
					<p className="text-center text-gray-600 mb-10">
						Welcome to the Alumni Mentorship Program. Our program
						connects experienced alumni with current students and
						recent graduates to provide guidance, support, and
						professional development opportunities.
					</p>
					<div className="flex justify-center items-center my-2">
						<Link to="become-mentor">
							<button className="btn btn-active btn-primary">
								Be a Mentor
							</button>
						</Link>
					</div>

					{/* Featured Mentors Section */}
					<section className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">
							Featured Mentors
						</h2>
						{/* Responsive grid for Featured Mentors */}
						<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{/* Card-1 */}
							<div className="bg-white shadow-lg rounded-lg overflow-hidden">
								<figure>
									<img
										src="https://t3.ftcdn.net/jpg/07/66/70/58/360_F_766705827_BtsG3X7odEZfLf00K9tuPIHQuorIFiUp.jpg"
										alt="Mentor"
										className="w-full h-48 object-cover"
									/>
								</figure>
								<div className="p-4">
									<h3 className="font-bold text-lg mb-2">
										Abhinash Patra
									</h3>
									<p className="text-gray-600">
										Currently work at Google. Proficient in
										Data Analysis
									</p>
									<div className="flex items-center justify-between mt-4 gap-5">
										<RatingComponent maxRating={5} />
										<button className="btn btn-primary">
											Learn More
										</button>
									</div>
								</div>
							</div>
							{/* Card-2 */}
							<div className="bg-white shadow-lg rounded-lg overflow-hidden">
								<figure>
									<img
										src="https://c8.alamy.com/comp/2C83114/smiling-young-indian-female-teacher-wearing-glasses-sitting-at-table-2C83114.jpg"
										alt="Mentor"
										className="w-full h-48 object-cover"
									/>
								</figure>
								<div className="p-4">
									<h3 className="font-bold text-lg mb-2">
										Mina Rani
									</h3>
									<p className="text-gray-600">
										SDE at Amazon. Proficient in Software
										Development
									</p>
									<div className="flex items-center justify-between mt-4 gap-5">
										<RatingComponent maxRating={5} />
										<button className="btn btn-primary">
											Learn More
										</button>
									</div>
								</div>
							</div>
							{/* Card-3 (Example of additional card) */}
							<div className="bg-white shadow-lg rounded-lg overflow-hidden">
								<figure>
									<img
										src="https://static.toiimg.com/thumb/msid-95674022,width-1280,height-720,resizemode-4/95674022.jpg"
										alt="Mentor"
										className="w-full h-48 object-cover"
									/>
								</figure>
								<div className="p-4">
									<h3 className="font-bold text-lg mb-2">
										Aman Raj Sahu
									</h3>
									<p className="text-gray-600">
										PHD candidate in Cyber Security at
										Harvard. Love to teach Cyber Security to
										Students.
									</p>
									<div className="flex items-center justify-between mt-4 gap-5">
										<RatingComponent
											maxRating={5}
											onRatingSelect={handleRatingSelect}
										/>
										<button className="btn btn-primary">
											Learn More
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Recent Mentorship Activities Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4">
							Recent Mentorship Activities
						</h2>
						{/* Responsive grid for recent activities */}
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
							<div className="flex items-center bg-white p-4 rounded-lg shadow">
								<div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
									<figure>
										<img
											src="https://static.toiimg.com/thumb/msid-95674022,width-1280,height-720,resizemode-4/95674022.jpg"
											alt="Mentor"
											className="w-full h-12 object-center rounded-full"
										/>
									</figure>
								</div>
								<div className="ml-4">
									<p className="text-gray-700">
										<strong>Aman Raj Sahu</strong> mentored{" "}
										<strong>Dinesh Patel</strong>
									</p>
									<p className="text-gray-500 text-sm">
										March 8, 2025
									</p>
								</div>
							</div>
							<div className="flex items-center bg-white p-4 rounded-lg shadow">
								<div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
									<figure>
										<img
											src="https://c8.alamy.com/comp/2C83114/smiling-young-indian-female-teacher-wearing-glasses-sitting-at-table-2C83114.jpg"
											alt="Mentor"
											className="w-full h-12 object-center rounded-full"
										/>
									</figure>
								</div>
								<div className="ml-4">
									<p className="text-gray-700">
										<strong>Mina Rani</strong> mentored{" "}
										<strong>Sameera Singh</strong>
									</p>
									<p className="text-gray-500 text-sm">
										June 11, 2025
									</p>
								</div>
							</div>
							<div className="flex items-center bg-white p-4 rounded-lg shadow">
								<div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
									<figure>
										<img
											src="https://t3.ftcdn.net/jpg/07/66/70/58/360_F_766705827_BtsG3X7odEZfLf00K9tuPIHQuorIFiUp.jpg"
											alt="Mentor"
											className="w-full h-12 object-center rounded-full"
										/>
									</figure>
								</div>
								<div className="ml-4">
									<p className="text-gray-700">
										<strong>Abhinash Patra</strong> mentored{" "}
										<strong>Gautam Padhi</strong>
									</p>
									<p className="text-gray-500 text-sm">
										December 4, 2025
									</p>
								</div>
							</div>
							{/* Add more mentorship activities similarly */}
						</div>
					</section>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MentorshipHomePage;
