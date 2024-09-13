import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const MentorshipListPage = () => {
	const [search, setSearch] = useState("");

	const mentorshipPrograms = [
		{
			title: "Software Engineering Mentorship",
			description:
				"A comprehensive guide to becoming a successful software engineer.",
			image: "https://www.herzing.edu/sites/default/files/2020-09/how-to-become-software-engineer.jpg",
		},
		{
			title: "Data Science Mentorship",
			description: "Learn data science with industry experts.",
			image: "https://media.licdn.com/dms/image/D5612AQFzPdZDA8bE_A/article-cover_image-shrink_600_2000/0/1684930016865?e=2147483647&v=beta&t=3Vw9vK7_Wl0j9OkMzfvqelJYMsH00LkSAyHMbO7ph3M",
		},
		{
			title: "UI/UX Design Mentorship",
			description:
				"Master the art of user interface and experience design.",
			image: "https://www.mindinventory.com/blog/wp-content/uploads/2023/11/difference-between-ui-ux.webp",
		},
		{
			title: "Product Management Mentorship",
			description: "Become a product management expert.",
			image: "https://cdn.sanity.io/images/tlr8oxjg/production/8654239949755df40b9750508d22e758ea155d4d-945x530.png?w=3840&q=100&fit=clip&auto=format",
		},
	];

	const filteredPrograms = mentorshipPrograms.filter(
		(program) =>
			program.title.toLowerCase().includes(search.toLowerCase()) ||
			program.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<Header />
			<div className="min-h-screen p-4 md:p-8 bg-[#cbd9f8]">
				<h1 className="text-3xl font-bold text-center mb-6">
					Mentorship Programs
				</h1>
				<div className="flex justify-center mb-8">
					<input
						type="text"
						placeholder="Search mentorship programs..."
						className="border rounded-lg p-2 w-full md:w-1/2"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{filteredPrograms.map((program, index) => (
						<div
							key={index}
							className="bg-[#171d32] text-[#cbd9f8]  rounded-lg shadow-md p-4 md:p-6 flex flex-col"
						>
							<img
								src={program.image}
								alt={program.title}
								className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
							/>
							<h2 className="text-2xl font-bold mb-2">
								{program.title}
							</h2>
							<p className="text-[#cbd9f8]  mb-4">
								{program.description}
							</p>
							<button className="mt-auto bg-[#cbd9f8] text-[#171d32] py-2 px-4 rounded-lg hover:bg-[#171d32] hover:text-[#cbd9f8]">
								Learn More
							</button>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MentorshipListPage;
