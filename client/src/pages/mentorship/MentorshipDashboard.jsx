import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const MentorshipCard = ({ program }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 mb-4 lg:mb-6">
			<h3 className="text-2xl font-bold mb-2">{program.title}</h3>
			<p className="text-gray-700 mb-4">{program.description}</p>
			<p className="text-sm text-gray-500">Starts: {program.startDate}</p>
			<p className="text-sm text-gray-500">Ends: {program.endDate}</p>
		</div>
	);
};

const MentorshipDashboard = () => {
	const upcomingPrograms = [
		{
			title: "Web Development Bootcamp",
			description:
				"Learn the fundamentals of web development in 8 weeks.",
			startDate: "September 5, 2024",
			endDate: "October 30, 2024",
		},
		{
			title: "Data Science Mentorship",
			description:
				"An intensive program focusing on data analysis and machine learning.",
			startDate: "October 1, 2024",
			endDate: "November 30, 2024",
		},
	];

	const runningPrograms = [
		{
			title: "UI/UX Design Masterclass",
			description:
				"A comprehensive guide to user interface and user experience design.",
			startDate: "August 1, 2024",
			endDate: "September 15, 2024",
		},
		{
			title: "Advanced React Training",
			description:
				"Deep dive into React and building complex web applications.",
			startDate: "August 20, 2024",
			endDate: "October 10, 2024",
		},
	];

	return (
		<>
			<Header />
			<div className="min-h-screen bg-[#cbd9f8] mx-auto p-6">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Mentorship Dashboard
				</h1>

				<div className="mb-12">
					<h2 className="text-3xl font-semibold mb-4">
						Upcoming Mentorship Programs
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
						{upcomingPrograms.map((program, index) => (
							<MentorshipCard key={index} program={program} />
						))}
					</div>
				</div>

				<div>
					<h2 className="text-3xl font-semibold mb-4">
						Running Mentorship Programs
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
						{runningPrograms.map((program, index) => (
							<MentorshipCard key={index} program={program} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MentorshipDashboard;
